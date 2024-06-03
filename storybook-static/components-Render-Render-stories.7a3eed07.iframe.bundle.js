"use strict";(self.webpackChunk_cfinnestad_react_form_builder=self.webpackChunk_cfinnestad_react_form_builder||[]).push([[997],{"./src/components/Render/Render.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Render__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/Render/Render.tsx"),_StoriesSubmit__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Render/StoriesSubmit.tsx"),_shared_themes_TestTheme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/shared/themes/TestTheme.ts"),_faker_js_faker__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@faker-js/faker/dist/esm/index.mjs");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Render",component:_Render__WEBPACK_IMPORTED_MODULE_0__.ZP,tags:["autodocs"],argTypes:{Items:[{id:"testItem",type:"Field",name:"text",required:!1,label:"Text",deprecated:!1,subtype:"Text",minLength:2,maxLength:4}]}},Primary={args:{Items:[{id:"first_name",type:"Field",name:"first_name",required:!0,label:'First Name (Type "show")',deprecated:!1,subtype:"Text",maxLength:10,minLength:2},{id:"last_name",type:"Field",name:"last_name",required:!0,label:"Last Name",deprecated:!1,subtype:"Text",maxLength:10,minLength:2},{id:"text2",type:"Field",name:"text2",required:!0,label:"Text 2",deprecated:!1,filter:{comparison:"=",fieldId:"first_name",value:"show"},subtype:"Text"},{id:"group1",type:"Group",name:"group1",label:"Testing Group",items:[{id:"group1-text3",type:"Field",name:"text3",label:"Text 3",subtype:"Text"},{id:"group1-email1",type:"Field",name:"email1",required:!0,label:"Email",subtype:"Email",maxLength:255}]},{id:"autocomplete1",allowAnyInput:!0,type:"Field",name:"autocomplete1",required:!0,label:"City",deprecated:!1,subtype:"Autocomplete",searchableOptionsName:"exampleCities",options:[{label:"First"},{label:"Second"}]},{id:"zip_code",type:"Field",name:"zip_code",required:!0,label:"Zip Code",subtype:"Number",helperText:"Helper text"},{id:"phone1",type:"Field",name:"phone1",required:!0,label:"Phone 1",subtype:"Phone",helperText:"Helper text",placeholder:"(555) 555-5555"},{id:"Select_Multiples",type:"Field",name:"Select_Multiples",subtype:"Select",label:"Select",multiples:!0,helperText:"Select helper text test",options:[{selected:!0,label:"Second",value:"second value"},{label:"Third"},{label:"Fourth"}]},{id:"Select",type:"Field",name:"Select",subtype:"Select",label:"Select",multiples:!0,helperText:"Select helper text test",options:[{label:"First"},{selected:!0,label:"Second"}]},{id:"Checkbox",type:"Field",name:"Checkbox",subtype:"Checkbox",label:"Checkbox",helperText:"Checkbox helper text test",options:[{label:"First"},{selected:!0,label:"Second",value:"second value"}]},{id:"HTML1",type:"HTML",content:"<h4>Hello</h4>",filter:{fieldId:"Checkbox",comparison:"=",value:"First"}},{id:"date1",type:"Field",name:"date1",label:"Date",subtype:"Date",helperText:"Helper text"},{id:"date2",type:"Field",name:"date2",label:"Date Filter",subtype:"Date",filter:{fieldId:"date1",comparison:"=",value:"08/07/2023"}},{id:"boolean1",type:"Field",label:"Boolean Label",description:"Boolean Description",name:"boolean1",subtype:"Boolean",helperText:"This is the boolean helper text"},{id:"radio1",type:"Field",label:"Radio1",name:"radio1",subtype:"Radio",inLine:!0,helperText:"Radio helper text",options:[{label:"Radio 1"},{label:"Radio 2",value:"Radio 2 value",selected:!0}]},{type:"Submit",id:"submit1",label:"Submit",submitElementName:"default"}],Options:{muiTheme:_shared_themes_TestTheme__WEBPACK_IMPORTED_MODULE_2__.C,submitElements:{default:_StoriesSubmit__WEBPACK_IMPORTED_MODULE_1__.k},searchableOptions:{exampleCities:input=>null!=input?exampleCities.filter((city=>city.value?.toLowerCase().includes(input))):[]}}}},exampleCities=[];for(let x=0;x<50;x++){const city=_faker_js_faker__WEBPACK_IMPORTED_MODULE_3__.We.location.city();exampleCities.push({label:city,value:city.toLowerCase()})}Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    Items: [({\n      id: 'first_name',\n      type: 'Field',\n      name: 'first_name',\n      required: true,\n      label: 'First Name (Type \"show\")',\n      deprecated: false,\n      subtype: 'Text',\n      maxLength: 10,\n      minLength: 2\n    } as TextSubtype), ({\n      id: 'last_name',\n      type: 'Field',\n      name: 'last_name',\n      required: true,\n      label: 'Last Name',\n      deprecated: false,\n      subtype: 'Text',\n      maxLength: 10,\n      minLength: 2\n    } as TextSubtype), ({\n      id: 'text2',\n      type: 'Field',\n      name: 'text2',\n      required: true,\n      label: 'Text 2',\n      deprecated: false,\n      filter: ({\n        comparison: \"=\",\n        fieldId: \"first_name\",\n        value: 'show'\n      } as EqFilter),\n      subtype: 'Text'\n    } as TextSubtype), ({\n      id: 'group1',\n      type: 'Group',\n      name: 'group1',\n      label: 'Testing Group',\n      items: [({\n        id: 'group1-text3',\n        type: 'Field',\n        name: 'text3',\n        label: 'Text 3',\n        subtype: 'Text'\n      } as TextSubtype), ({\n        id: 'group1-email1',\n        type: 'Field',\n        name: 'email1',\n        required: true,\n        label: 'Email',\n        subtype: 'Email',\n        maxLength: 255\n      } as EmailSubtype)]\n    } as GroupItem), ({\n      id: 'autocomplete1',\n      allowAnyInput: true,\n      type: 'Field',\n      name: 'autocomplete1',\n      required: true,\n      label: 'City',\n      deprecated: false,\n      subtype: 'Autocomplete',\n      searchableOptionsName: 'exampleCities',\n      options: [{\n        label: 'First'\n      }, {\n        label: 'Second'\n      }]\n    } as AutocompleteSubtype), ({\n      id: 'zip_code',\n      type: 'Field',\n      name: 'zip_code',\n      required: true,\n      label: 'Zip Code',\n      subtype: 'Number',\n      helperText: 'Helper text'\n    } as NumberSubtype), ({\n      id: 'phone1',\n      type: 'Field',\n      name: 'phone1',\n      required: true,\n      label: 'Phone 1',\n      subtype: 'Phone',\n      helperText: 'Helper text',\n      placeholder: '(555) 555-5555'\n    } as PhoneSubtype), ({\n      id: 'Select_Multiples',\n      type: 'Field',\n      name: 'Select_Multiples',\n      subtype: 'Select',\n      label: 'Select',\n      multiples: true,\n      helperText: 'Select helper text test',\n      options: [{\n        selected: true,\n        label: 'Second',\n        value: 'second value'\n      }, {\n        label: 'Third'\n      }, {\n        label: 'Fourth'\n      }]\n    } as SelectSubtype), ({\n      id: 'Select',\n      type: 'Field',\n      name: 'Select',\n      subtype: 'Select',\n      label: 'Select',\n      multiples: true,\n      helperText: 'Select helper text test',\n      options: [{\n        label: 'First'\n      }, {\n        selected: true,\n        label: 'Second'\n      }]\n    } as SelectSubtype), ({\n      id: 'Checkbox',\n      type: 'Field',\n      name: 'Checkbox',\n      subtype: 'Checkbox',\n      label: 'Checkbox',\n      helperText: 'Checkbox helper text test',\n      options: [{\n        label: 'First'\n      }, {\n        selected: true,\n        label: 'Second',\n        value: 'second value'\n      }]\n    } as CheckboxSubtype), ({\n      id: \"HTML1\",\n      type: \"HTML\",\n      content: \"<h4>Hello</h4>\",\n      filter: ({\n        fieldId: \"Checkbox\",\n        comparison: \"=\",\n        value: \"First\"\n      } as EqFilter)\n    } as HTMLItem), ({\n      id: \"date1\",\n      type: 'Field',\n      name: 'date1',\n      label: 'Date',\n      subtype: 'Date',\n      helperText: 'Helper text'\n    } as DateSubtype), ({\n      id: \"date2\",\n      type: 'Field',\n      name: 'date2',\n      label: 'Date Filter',\n      subtype: 'Date',\n      filter: ({\n        fieldId: \"date1\",\n        comparison: \"=\",\n        value: \"08/07/2023\"\n      } as EqFilter)\n    } as DateSubtype), ({\n      id: 'boolean1',\n      type: 'Field',\n      label: 'Boolean Label',\n      description: 'Boolean Description',\n      name: 'boolean1',\n      subtype: 'Boolean',\n      helperText: 'This is the boolean helper text'\n    } as BooleanSubtype), ({\n      id: 'radio1',\n      type: 'Field',\n      label: 'Radio1',\n      name: 'radio1',\n      subtype: 'Radio',\n      inLine: true,\n      helperText: 'Radio helper text',\n      options: [{\n        label: 'Radio 1'\n      }, {\n        label: 'Radio 2',\n        value: 'Radio 2 value',\n        selected: true\n      }]\n    } as RadioSubtype), ({\n      type: 'Submit',\n      id: 'submit1',\n      label: 'Submit',\n      submitElementName: 'default'\n    } as SubmitItem)],\n    Options: {\n      muiTheme: TestTheme,\n      submitElements: {\n        'default': Submit\n      },\n      searchableOptions: {\n        exampleCities: input => input != null ? exampleCities.filter(city => city.value?.toLowerCase().includes(input)) : []\n      }\n    }\n  }\n}",...Primary.parameters?.docs?.source}}};const __namedExportsOrder=["Primary"]},"./src/shared/themes/TestTheme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>TestTheme});const TestTheme=(0,__webpack_require__("./node_modules/@mui/material/styles/createTheme.js").Z)({components:{MuiInputLabel:{styleOverrides:{root:{fontFamily:"Sans-Serif"}},defaultProps:{shrink:!0}},MuiOutlinedInput:{defaultProps:{sx:{"&:hover":{bgcolor:"primary.light"},"&:focus-within":{bgcolor:"primary.light"},height:"3rem"}},styleOverrides:{root:({ownerState,theme})=>({backgroundColor:ownerState.error?theme.palette.error.light:void 0})}},MuiInput:{defaultProps:{sx:{height:"3rem"}}},MuiTextField:{defaultProps:{fullWidth:!0}}},palette:{primary:{main:"#00A9E0",light:"#F3FCFF",dark:"#0084B0"},error:{main:"#E50000",light:"#FFF3F3",dark:"#B40000"},success:{main:"#188623",light:"#F2FDF3",dark:"#13691B"}},typography:{fontFamily:"Sans-Serif",fontWeightMedium:600,body1:{fontFamily:"Sans-Serif"},caption:{fontFamily:"Sans-Serif",fontSize:"0.625rem",fontWeight:"bold"}}})}}]);