import { Dimensions } from "react-native";


const {width,height} = Dimensions.get("screen")

const guideWidth = 375;
const guideHeight = 812;

const widthScale = size =>(width/guideWidth)* size
const heightScale = size => (height/guideHeight)*size

const fontScale = (size, factor=0.5)=>Math.abs(size +(heightScale(size)-size)*factor)

export {widthScale,heightScale,fontScale}