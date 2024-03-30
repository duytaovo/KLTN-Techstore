// import React, { Component, useState } from "react";

// import {
//   StyleSheet,
//   ScrollView,
//   Text,
//   View,
//   TextInput,
//   Button,
//   Image,
//   TouchableOpacity
// } from "react-native";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFunnelDollar, faSearch } from "@fortawesome/free-solid-svg-icons";

// const container = document.createElement("div");
// document.body.appendChild(container);

// export default class HomeContainer extends Component {
//   constructor() {
//     super();

//     this.state = {
//       checked: []
//     };
//   }

//   render() {
//     return (
//       <ScrollView>
//         <ScrollView horizontal>
//           <View style={style.container}>
//             <View style={style.header2}>
//               <View style={style.header1} />
//               <View style={style.header2}>
//                 <br />{" "}
//                 <Text style={{ paddingLeft: 10 }}>
//                   <Image
//                     style={{
//                       width: 280,
//                       height: 350
//                     }}
//                     source={require("../public/1.jpg")}
//                   />
//                 </Text>
//                 <br />
//               </View>
//               <View style={style.header1} />
//               <View style={style.header2}>
//                 <View style={{ width: 750 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Top Brands</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 150,
//                         height: 150
//                       }}
//                       source={require("../public/2.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 150,
//                         height: 150
//                       }}
//                       source={require("../public/3.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 150,
//                         height: 150
//                       }}
//                       source={require("../public/4.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 150,
//                         height: 150
//                       }}
//                       source={require("../public/5.jpg")}
//                     />
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />
//               <View style={style.header2}>
//                 <View style={{ width: 850 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Discount Vouchers</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 250,
//                         height: 80
//                       }}
//                       source={require("../public/6.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 10 }} />{" "}
//                     <Image
//                       style={{
//                         width: 250,
//                         height: 80
//                       }}
//                       source={require("../public/7.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 10 }} />{" "}
//                     <Image
//                       style={{
//                         width: 250,
//                         height: 80
//                       }}
//                       source={require("../public/8.jpg")}
//                     />
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />
//               <View style={style.header2}>
//                 <View style={{ width: 2000 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>
//                       Categories
//                       <Text>
//                         <Text style={{ paddingLeft: 20 }} />
//                         <TextInput
//                           style={style.Input}
//                           placeholder="Search Gift Card"
//                         />
//                         <FontAwesomeIcon icon={faSearch} />{" "}
//                       </Text>
//                     </Text>
//                     <br />
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 120,
//                         height: 150
//                       }}
//                       source={require("../public/9.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 120,
//                         height: 140
//                       }}
//                       source={require("../public/10.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 120,
//                         height: 140
//                       }}
//                       source={require("../public/11.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 120,
//                         height: 140
//                       }}
//                       source={require("../public/12.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 104,
//                         height: 140
//                       }}
//                       source={require("../public/14.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 120,
//                         height: 140
//                       }}
//                       source={require("../public/15.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 110,
//                         height: 140
//                       }}
//                       source={require("../public/16.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 105,
//                         height: 140
//                       }}
//                       source={require("../public/17.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 90,
//                         height: 140
//                       }}
//                       source={require("../public/18.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 120,
//                         height: 140
//                       }}
//                       source={require("../public/19.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 120,
//                         height: 140
//                       }}
//                       source={require("../public/20.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 110,
//                         height: 140
//                       }}
//                       source={require("../public/21.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 110,
//                         height: 140
//                       }}
//                       source={require("../public/22.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 110,
//                         height: 140
//                       }}
//                       source={require("../public/23.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 120,
//                         height: 140
//                       }}
//                       source={require("../public/24.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <br />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 1500 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Entertainment</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 180,
//                         height: 150
//                       }}
//                       source={require("../public/25.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 180,
//                         height: 150
//                       }}
//                       source={require("../public/26.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 180,
//                         height: 150
//                       }}
//                       source={require("../public/27.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 180,
//                         height: 150
//                       }}
//                       source={require("../public/28.jpg")}
//                     />
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 180,
//                         height: 150
//                       }}
//                       source={require("../public/29.jpg")}
//                     />
//                     <Text style={{ paddingLeft: 7 }} />
//                     <Image
//                       style={{
//                         width: 180,
//                         height: 150
//                       }}
//                       source={require("../public/30.jpg")}
//                     />
//                     <Text style={{ paddingLeft: 7 }} />
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 1500 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Grocery Dept. Stores</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/31.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/32.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/33.jpg")}
//                     />
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2000 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Jewellery</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/34.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/35.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/36.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/37.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/38.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/39.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/40.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/41.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/42.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/43.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 190,
//                         height: 154
//                       }}
//                       source={require("../public/44.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/45.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/46.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/47.jpg")}
//                     />
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2000 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Travel</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/48.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/49.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/50.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/51.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/52.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/53.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/54.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/55.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 150
//                       }}
//                       source={require("../public/56.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Apparel</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/57.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/58.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/59.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/60.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/61.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/62.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/63.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/64.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/65.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/66.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/67.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/68.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/69.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/70.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/71.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/72.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/73.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/74.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/75.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/76.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/77.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/78.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/79.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/80.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/81.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/82.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/83.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Accessories</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/84.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/85.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/86.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/87.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/88.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/89.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/90.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Books and Stationery</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/91.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Health and Beauty</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/92.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/93.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/94.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/95.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/96.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/97.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 230,
//                         height: 180
//                       }}
//                       source={require("../public/98.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Food and Beverage</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/99.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/100.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/101.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/102.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/103.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/104.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/105.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/106.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/107.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/108.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/109.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/110.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>E - Commerce</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/111.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/112.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/113.jpg")}
//                     />{" "}
//                     <Text style={{ paddingLeft: 7 }} />{" "}
//                     <Image
//                       style={{
//                         width: 260,
//                         height: 180
//                       }}
//                       source={require("../public/114.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Luxury</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/115.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Music</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/116.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Spa</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/117.jpg")}
//                     />{" "}
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/118.jpg")}
//                     />{" "}
//                     <Image
//                       style={{
//                         width: 260,
//                         height: 180
//                       }}
//                       source={require("../public/119.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Online Pen Store</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/120.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />{" "}
//               <View style={style.header2}>
//                 <View style={{ width: 2200 }}>
//                   <br />{" "}
//                   <Text style={{ paddingLeft: 10 }}>
//                     <Text style={style.col3}>Service Providers</Text>
//                     <br />
//                     <br />
//                     <Image
//                       style={{
//                         width: 200,
//                         height: 180
//                       }}
//                       source={require("../public/121.jpg")}
//                     />{" "}
//                   </Text>
//                   <br />
//                 </View>
//               </View>{" "}
//               <View style={style.header1} />
//             </View>
//           </View>
//         </ScrollView>
//       </ScrollView>
//     );
//   }
// }
// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: 350,

//     padding: 10
//   },
//   header1: {
//     backgroundColor: "#F5F5F5",
//     width: 350,

//     padding: 8
//   },

//   header2: {
//     backgroundColor: "#FFFFFF",
//     width: 300
//   },
//   col1: {
//     paddingLeft: 13,
//     fontSize: 20,
//     color: "#0392fb",
//     fontWeight: "bold"
//   },
//   col3: {
//     fontWeight: "bold",
//     color: "#808080",
//     fontSize: 20
//   },
//   Input: {
//     borderWidth: 1,
//     bordercolor: "#273655",
//     margin: 5,
//     padding: 7,
//     height: 32,
//     backgroundColor: "white",
//     width: 130,
//     color: "#273655"
//   }
// });

