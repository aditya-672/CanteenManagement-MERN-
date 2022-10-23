import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useToast,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  // Input,
  FormControl,
  FormLabel,
  // Select,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function ProductAddToCart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderlist, setOrderlist] = useState([]);
  const [updatedata, setUpdateData] = useState([]);
  const [oS, setOS] = useState(updatedata.orderStatus);
  const [pS, setPS] = useState(updatedata.paymentStatus);
  const toast = useToast();

  const getData = async () => {
    try {
      const res = await fetch("/showorders", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      const data = await res.json();
      setOrderlist(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    if(!oS){
      setOS(updatedata.orderStatus)
    }
    if(!pS){
      setPS(updatedata.paymentStatus)
    }
    try {
      const res = await fetch("/updateStatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus: oS,
          paymentStatus: pS,
          _id: updatedata._id,
        }),
      });
      const data = await res.json();
      if (data === "400") {
        alert("Error");
      } else {
        // alert("Success");
        getData();
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [updatedata]);
  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Button
        onClick={() =>
          toast({
            title: "top-right toast",
            position: "top-right",
            variant: "top-accent",
            status: "success",
            duration: 30000,
            isClosable: true,
          })
        }
      >
        Show toast
      </Button>
      {orderlist.map((data) => {
        if (data.orderStatus === "Done" && data.paymentStatus === "Done") {
          return <Box key={data.id}>No Current Orders</Box>;
        }
        return (
          <Box
            key={data.id}
            // bg={useColorModeValue("white", "gray.800")}
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative"
          >
            {data.isNew && (
              <Circle
                size="10px"
                position="absolute"
                top={2}
                right={2}
                bg="red.200"
                border="2"
              />
            )}
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                {data.isNew && (
                  <Badge
                    rounded="full"
                    px="2"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    New
                  </Badge>
                )}
              </Box>
              <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Text fontSize="lg">Order Id : </Text>
                <Box
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                >
                  {data.orderid}
                </Box>
              </Flex>
              <Flex justifyContent="space-between" alignContent="center">
                <Box fontSize="2xl">
                  <Box as="span" color={"gray.600"} fontSize="lg">
                    <Accordion allowMultiple>
                      {data.order.map((item) => {
                        return (
                          <AccordionItem key={item.id}>
                            <h2>
                              <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  {item.name}
                                </Box>
                                <Box flex="1" textAlign="left">
                                  {item.quantity}
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>{item.price}</AccordionPanel>
                            <AccordionPanel pb={4}>
                              {" "}
                              <Image
                                src={item.image}
                                alt={`Picture of ${item.image}`}
                                roundedTop="lg"
                              />
                            </AccordionPanel>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </Box>
                </Box>
              </Flex>
              <Flex justifyContent="space-between" alignContent="center">
                <Box fontSize="2xl">
                  <Box as="span" color={"gray.600"} fontSize="lg">
                    ₹
                  </Box>
                  {data.totalprice}
                </Box>
              </Flex>
              <Flex justifyContent="space-between" alignContent="center" mt="2">
                <Box fontSize="2xl">
                  <Button
                    colorScheme="teal"
                    w="100"
                    onClick={() => {
                      onOpen();
                      setUpdateData(data);
                    }}
                  >
                    Update Status
                  </Button>
                </Box>
              </Flex>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update Order Status</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl p="2">
                    <FormLabel>Payment Status</FormLabel>
                    <RadioGroup defaultValue={data.paymentStatus}>
                      <Stack spacing={5} direction="row">
                        <Radio
                          colorScheme="red"
                          value="Pending"
                          name="paymentStatus"
                          onChange={(e) => {
                            setPS(e.target.value);
                          }}
                        >
                          Pending
                        </Radio>
                        <Radio
                          colorScheme="green"
                          value="Done"
                          name="paymentStatus"
                          onChange={(e) => {
                            setPS(e.target.value);
                          }}
                        >
                          Done
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl p="2">
                    <FormLabel>Order Status</FormLabel>
                    <RadioGroup defaultValue={data.orderStatus}>
                      <Stack spacing={5} direction="row">
                        <Radio
                          colorScheme="red"
                          value="Cooking"
                          name="orderStatus"
                          onChange={(e) => {
                            setOS(e.target.value);
                          }}
                        >
                          Cooking
                        </Radio>
                        <Radio
                          colorScheme="green"
                          value="Done"
                          name="orderStatus"
                          onChange={(e) => {
                            setOS(e.target.value);
                          }}
                        >
                          Done
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    mr={3}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  <Button colorScheme="teal" onClick={handleUpdate} mr={3}>
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        );
      })}
    </Flex>
  );
}

export default ProductAddToCart;
