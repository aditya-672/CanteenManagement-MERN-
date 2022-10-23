import React from "react";
import Navbar from "../navbar/Navbar";
import { FiShoppingCart } from "react-icons/fi";
import Product from "../../pages/Product/Product";
import { SimpleGrid, Box, Heading, Flex, Icon, Badge,useToast } from "@chakra-ui/react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { RoleContext } from "../../App";
import { useContext } from "react";

export default function Menu() {
  // const toast = useToast();
  const { totalUniqueItems } = useCart();
  const role = useContext(RoleContext);
  const [itm, setItm] = useState([]);
  const [orderlist , setOrderlist] = useState([]);
  // const [showNotification, setNotification] = useState(false);
  // const [orderlist, setOrderlist] = useState([]);
  // const [id,setId] = useState('');
  // const [list,setList] = useState([]);
  
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
      console.log("hi in get data")
      const data = await res.json();
      console.log(data);
      setOrderlist(data);
      console.log(orderlist)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "items"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setItm(list);
    });
    return unsub;
  }, []);

  // useEffect(() => {
  //   const check = () => {
  //     console.log(list);
  //     const filter = list.filter((item) => {
  //       return item.studentname === role.name;
  //     });
  //     setList(filter);
  //     console.log("F1 : ",list)
  //     const f = list.filter((i)=>{
  //       return(i.ishowed===false)
  //     })

  //     console.log("F2 : ",list)
  //     setList(f)
  //     const filter2 = list.filter((item) => {
  //       var nowtime = new Date();
  //       item.orderDate = new Date(item.orderDate);
  //       console.log(item.orderDate.getMinutes());
  //       return (nowtime.getMinutes() - item.orderDate.getMinutes()) < 20;
  //     });
  //     console.log("F3 :",filter2)
  //     // if(filter2.length!==0){
  //     //   setId(filter2._id)
  //     //   setNotification(true);
  //     // }
  //     console.log(filter2);
  //   };
  //   setInterval(() => {
  //     check();
  //   }, 60 * 500);
  // }, []);

  // const updateShowNotification = async () => {
  //   try {
  //     const res = await fetch("/showNotification", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         isshowed : true,
  //         _id:id,
  //       }),
  //     });
  //     toast({
  //       title: "top-right toast",
  //       position: "top-right",
  //       variant: "top-accent",
  //       status: "success",
  //       duration: 30000,
  //       isClosable: true,
  //     })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   updateShowNotification();
  // }, [showNotification]);

  

  return (
    <>
      <Navbar />
      <Flex justifyContent="space-between">
        <Heading as="h2" p="10" size="2xl">
          Menu Item
        </Heading>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column-reverse"
          alignItems="center"
          mr="20"
        >
          <Link to="/user/item-page">
            <Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"}></Icon>
          </Link>
          <Badge colorScheme="green">{totalUniqueItems}</Badge>
        </Box>
      </Flex>
      <SimpleGrid minChildWidth="250px" spacing={2} p="10">
        <Box>
          <Product itm={itm} />
        </Box>
      </SimpleGrid>
    </>
  );
}
