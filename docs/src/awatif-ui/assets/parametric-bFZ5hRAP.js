import{a as r,c as s}from"./A6KC6G5S-CTYnK_jX.js";const l={length:{value:10,min:1,max:20},height:{value:10,min:1,max:10}};function m(e){const n=[[0,0,0],[0,0,e.height.value],[e.length.value,0,e.height.value],[e.length.value,0,0]],u=[[0,1],[1,2],[2,3]],t={element:0,area:10,elasticity:10,momentOfInertiaY:10,momentOfInertiaZ:10,shearModulus:10,torsionalConstant:10},a=[{node:0,support:[!0,!0,!0,!0,!0,!0]},{node:3,support:[!0,!0,!0,!0,!0,!0]},{node:2,load:[10,0,0,0,0,0]},{...t,element:0},{...t,element:1},{...t,element:2}],o=s(n,u,a);return{nodes:n,elements:u,analysisResults:o}}r({parameters:l,onParameterChange:m});
