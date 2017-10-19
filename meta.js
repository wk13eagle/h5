module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true, // true时, 输入内容时message消失, false时, 输入内容时message不消失
      "message": "Project name"
    },
    "version": {
      "type": "string",
      "required": false,
      "message": "Project version",
      "default": "0.0.1"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "H5 for mobile"
    },
    "author": {
      "type": "string",
      "message": "Author"
    }
    // ,
    // "router": { // 是否安装 vue-router
    //   "type": "confirm",
    //   "message": "Install vue-router?"
    // }
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/wk13eagle/h5"
};
