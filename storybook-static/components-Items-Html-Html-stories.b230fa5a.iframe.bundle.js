"use strict";(self.webpackChunk_cfinnestad_react_form_builder=self.webpackChunk_cfinnestad_react_form_builder||[]).push([[825],{"./src/components/Items/Html/Html.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,Filter:()=>Filter,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Render_StoriesSubmit__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/Render/StoriesSubmit.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Items/HTML",component:__webpack_require__("./src/components/index.ts").Hr,tags:["autodocs"],argTypes:{Items:[{type:"HTML",id:"html1",content:"<h2>My Content</h2>"}]}},Basic={args:{Items:[{type:"HTML",id:"html1",content:"<h2>My Content</h2>"},{type:"Submit",id:"submit1",label:"Submit",submitElementName:"default"}],Options:{submitElements:{default:_Render_StoriesSubmit__WEBPACK_IMPORTED_MODULE_0__.k}}}},Filter={args:{...Basic.args,Items:[{type:"Field",subtype:"Boolean",id:"boolean1",name:"boolean1",label:"Show HTML"},{...Basic.args.Items[0],filter:{comparison:"=",fieldId:"boolean1",value:!0}},{type:"Submit",id:"submit1",label:"Submit",submitElementName:"default"}]}};Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:"{\n  args: {\n    Items: [({\n      type: 'HTML',\n      id: 'html1',\n      content: '<h2>My Content</h2>'\n    } as HTMLItem), ({\n      type: 'Submit',\n      id: 'submit1',\n      label: 'Submit',\n      submitElementName: 'default'\n    } as SubmitItem)],\n    Options: {\n      submitElements: {\n        'default': Submit\n      }\n    }\n  }\n}",...Basic.parameters?.docs?.source}}},Filter.parameters={...Filter.parameters,docs:{...Filter.parameters?.docs,source:{originalSource:"{\n  args: {\n    ...Basic.args,\n    Items: [({\n      type: 'Field',\n      subtype: 'Boolean',\n      id: 'boolean1',\n      name: 'boolean1',\n      label: 'Show HTML'\n    } as BooleanSubtype), ({\n      ...Basic.args.Items[0],\n      filter: ({\n        comparison: '=',\n        fieldId: 'boolean1',\n        value: true\n      } as EqFilter)\n    } as HTMLItem), ({\n      type: 'Submit',\n      id: 'submit1',\n      label: 'Submit',\n      submitElementName: 'default'\n    } as SubmitItem)]\n  }\n}",...Filter.parameters?.docs?.source}}};const __namedExportsOrder=["Basic","Filter"]},"./src/components/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Hr:()=>Render.ZP});__webpack_require__("./src/components/Builder/Builder.tsx"),__webpack_require__("./src/components/Builder/OnDragEnd.tsx");var Render=__webpack_require__("./src/components/Render/index.ts");__webpack_require__("./src/components/Actions/index.ts"),__webpack_require__("./src/components/Items/index.ts")}}]);