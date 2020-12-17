// pages/input/input.js
const app = getApp() //!!!
Page({
  data: {
    timename: null,//选择的时间
    numname: null,//选择的题数
    signname: null,//选择的运算模式
    signnumname: null,//选择的运算符数量
    ending:false,//隐藏
    lastresult:false,//结果隐藏
    equation: '', //在这里用全局变量赋值好像不行，所以在onload里赋值
    digital1: 1,
    digital2: 2,
    digital3: 3,
    digital4: 4,
    digital5: 5,
    digital6: 6,
    digital7: 7,
    digital8: 8,
    digital9: 9,
    digital0: 0,
    holder:"?",
    wrongnow:[],
    InputAnswerNumber: '',
    correctnum:0,//做对的题数
    wrongnum:0,//做错的题数
    totalnum:0,
    numpercent:0,//做题进度百分比
    timepercent:0,//时间进度百分比
    correctrate:0,//正确率
    time:0,//定时器变量
    redonumber:0,//重做序号
    playchoice:0,
    modechoice:0,
    gradechoice:0,
    isWujin:false,
    equa:""
  },
  // 计时器
  setTime() {
    let that = this
    let myTime = setInterval(function () {
      that.setData({
        time: that.data.time + 1,
        timepercent:((that.data.time*100)/(that.data.timename*60)).toFixed(0)
      })
      if (that.data.time > that.data.timename * 60||that.data.ending==true) {
        clearInterval(myTime)
        // 如果时间到了就结束答题
          that.setData({
            time:that.data.time-1,
            ending:true,
            holder:'',
          })
      }
    }, 1000)
  },
  generateEquation1: function () { 
    var equation; 
    var ans; 
    var op1, op2, num1, num2, num3; 
    var operator = new Array(".", "+", "-"); 
      op1 = this.randInt(1, 2); //随机生成运算符 
      // console.log(op1); 
      do { 
        num1 = this.randInt(10, 99); 
        num2 = this.randInt(1, 9); 
        ans = this.convertOp(op1, num1, num2); //计算答案 
      } while (ans < 0 || ans > 100); //直到生成算式的结果满足要求 
      equation = num1.toString() + operator[op1] + num2.toString() + "="; 
    app.globalData.nowEquation = equation; 
    app.globalData.nowAnswer = ans; 
    return 0; 
  }, 

 // 一年级模块2 
  generateEquation2: function () { 
    var equation; 
    var ans; 
    var op1, op2, num1, num2, num3; 
    var operator = new Array(".", "+", "-"); 
    var operatornum = 1; //随机生成运算符数量 
    if (operatornum == 1) {  //一个运算符 
      op1 = this.randInt(1, 2); //随机生成运算符 
      console.log(op1); 
      do { 
        num1 = this.randInt(1,9); 
        num1 = num1 * 10; 
        num2 = this.randInt(1,9); 
        num2 = num2 * 10; 
        ans = this.convertOp(op1, num1, num2); //计算答案 
      } while (ans < 0 || ans > 100); //直到生成算式的结果满足要求 
      equation = num1.toString() + operator[op1] + num2.toString() + "="; 
    } 
    app.globalData.nowEquation = equation; 
    app.globalData.nowAnswer = ans; 
    return 0; 
  }, 
   // 一年级模块3（两位数加减一位数加减一位数） 
   generateEquation3: function () { 
    var equation; 
    var ans; 
    var op1, op2, num1, num2, num3; 
    var operator = new Array(".", "+", "-"); 
      op1 = this.randInt(1, 2); 
      op2 = this.randInt(1, 2); 
      do { 
        num1 = this.randInt(1, 99); 
        num2 = this.randInt(1, 9); 
        num3 = this.randInt(1, 9); 
        ans = this.convertOp(op1, num1, num2); //计算答案 
        ans = this.convertOp(op2, ans, num3); 
      } while (ans < 0 || ans > 100); //直到生成算式的结果满足要求 
      equation = num1.toString() + operator[op1] + num2.toString() + operator[op2] + num3.toString() + "="; 
    app.globalData.nowEquation = equation; 
    app.globalData.nowAnswer = ans; 
    return 0; 
    },
// 二年级
//100以内的加减

generateEquation4: function () {
  var num;
  var i;
  var answer;
  var Sign = ["+", "-"];
  var equation = new Array();
  for (i = 0; i < Sign.length; i++)
    equation[i] = "0";
  var num11 = this.randomRange(0, 2);
  var sign1 = Sign[num11];
  do {
    var num1 = this.randomRange(10, 100);
    var num2 = this.randomRange(10, 100);
    equation[0] = num1;
    equation[2] = num2;
    equation[1] = sign1;
    var E = equation[0] + equation[1] + equation[2];
  }
  while (this.Suan4(num1, sign1, num2) <= 0 || this.Suan4(num1, sign1, num2) > 100 || (this.Suan4(num1, sign1, num2) % 1) != 0 || num1 == 0 || num2 == 0 )//规定不能出现0，结果在0~100之间

  this.setData({
    equa: E+'=',
    answer: (this.Suan4(num1, sign1, num2)).toString()
  })
  app.globalData.nowEquation = this.data.equa;
  app.globalData.nowAnswer = this.Suan4(num1, sign1, num2);
  return 0;
},

randomRange: function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
},
Suan4: function (num1, sign1, num2) {
  var ans;
  if (sign1=="+") ans=num1+num2;
  else if (sign1=="-") ans=num1-num2;
  return ans;
},
//100以内加减混合
generateEquation5: function () {
  var num;
  var i;
  var answer;
  var Sign = ["+", "-"];
  var equation = new Array();
  for (i = 0; i < Sign.length; i++)
    equation[i] = "0";
  var num11 = this.randomRange(0, 2);
  var num22 = this.randomRange(0, 2);
  var sign1 = Sign[num11];
  var sign2 = Sign[num22];
  do {
    var num1 = this.randomRange(1, 100);
    var num2 = this.randomRange(1, 100);
    var num3 = this.randomRange(1, 100);
    equation[0] = num1;
    equation[2] = num2;
    equation[4] = num3;
    equation[1] = sign1;
    equation[3] = sign2;
    var E = equation[0] + equation[1] + equation[2] + equation[3] + equation[4];
  }
  while (this.Suan5(num1, sign1, num2, sign2, num3) <= 0 || this.Suan5(num1, sign1, num2, sign2, num3) > 100 || (this.Suan5(num1, sign1, num2, sign2, num3) % 1) != 0 )//规定不能出现0，结果在0~100之间

  this.setData({
    equa: E+'=',
    answer: (this.Suan5(num1, sign1, num2, sign2, num3)).toString()
  })
  app.globalData.nowEquation = this.data.equa;
  app.globalData.nowAnswer = this.Suan5(num1, sign1, num2, sign2, num3);
  return 0;
},

randomRange: function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
},
Suan5: function (num1, sign1, num2, sign2, num3) {
  var ans;
  if (sign1 == "+" && sign2 == "+") ans = num1 + num2 + num3;
  else if (sign1 == "+" && sign2 == "-") ans = num1 + num2 - num3;
  else if (sign1 == "-" && sign2 == "+") ans = num1 - num2 + num3;
  else if (sign1 == "-" && sign2 == "-") ans = num1 - num2 - num3;
  return ans;
},
//整百整千加减
generateEquation6: function () {
  var num;
  var i;
  var answer;
  var Sign = ["+", "-"];
  var equation = new Array();
  for (i = 0; i < Sign.length; i++)
    equation[i] = "0";
  var num11 = this.randomRange(0, 2);
  var sign1 = Sign[num11];
  do {
    var num1 = (this.randomRange(0, 100))*100;
    var num2 = (this.randomRange(0, 10))*100;
    equation[0] = num1;
    equation[2] = num2;
    equation[1] = sign1;
    var E = equation[0] + equation[1] + equation[2];
  }
  while (this.Suan6(num1, sign1, num2) <= 0 || this.Suan6(num1, sign1, num2) > 10000 || (this.Suan6(num1, sign1, num2) % 1) != 0 || num1 == 0 || num2 == 0 )//规定不能出现0，结果在0~100之间

  this.setData({
    equa: E+'=',
    answer: (this.Suan6(num1, sign1, num2)).toString()
  })
  app.globalData.nowEquation = this.data.equa;
  app.globalData.nowAnswer = this.Suan6(num1, sign1, num2);
  return 0;
},

randomRange: function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
},
Suan6: function (num1, sign1, num2) {
  var ans;
  if (sign1=="+") ans=num1+num2;
  else if (sign1=="-") ans=num1-num2;
  return ans;
},
//九九乘法表内乘除
generateEquation7: function () {
  var num;
  var i;
  var answer;
  var Sign = ["×","÷"];
  var equation = new Array();
  for (i = 0; i < Sign.length; i++)
    equation[i] = "0";
  var num11 = this.randomRange(0, 2);
  var sign1 = Sign[num11];
  do {
    if(sign1 == "×"){
      var num1 = this.randomRange(1, 10);
      var num2 = this.randomRange(1, 10);
    }
    else if(sign1 == "÷"){
      var num3 = this.randomRange(1, 10);
      var num2 = this.randomRange(2, 10);
      num1 = num2 * num3;
    }
    equation[0] = num1;
    equation[2] = num2;
    equation[1] = sign1;
    var E = equation[0] + equation[1] + equation[2];
  }
  while (this.Suan7(num1, sign1, num2) <= 0 || (this.Suan7(num1, sign1, num2) % 1) != 0 )//规定不能出现0，结果在0~100之间

  this.setData({
    equa: E+'=',
    answer: (this.Suan7(num1, sign1, num2)).toString()
  })
  app.globalData.nowEquation = this.data.equa;
  app.globalData.nowAnswer = this.Suan7(num1, sign1, num2);
  return 0;
},

randomRange: function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
},
Suan7: function (num1, sign1, num2) {
  var ans;
  if (sign1 == "×") ans = num1 * num2;
  else if (sign1 == "÷") ans = num1 / num2;
  return ans;
},
// 三年级部分
  //3-1
  // 两位数加减两位数
  generateEquation8: function () {
    var equation;
    var ans;
    var op1, op2, num1, num2, num3;
    var operator = new Array(".", "+", "-");
    var operatornum = this.randInt(1, 2); //随机生成运算符数量
    if (operatornum == 1) {  //一个运算符
      op1 = this.randInt(1, 2); //随机生成运算符
      do {
        num1 = this.randInt(10, 99);
        num2 = this.randInt(10, 99);
        ans = this.convertOp(op1, num1, num2); //计算答案
      } while (ans < 0); //直到生成算式的结果满足要求
      equation = num1.toString() + operator[op1] + num2.toString() + "=";
    }
    else if (operatornum == 2) { //两个运算符
      op1 = this.randInt(1, 2);
      op2 = this.randInt(1, 2);
      do {
        num1 = this.randInt(10, 99);
        num2 = this.randInt(10, 99);
        num3 = this.randInt(10, 99);
        ans = this.convertOp2(num1,op1,num2,op2,num3);
      }while((op1==2&&num2>num1)||ans < 0)
      equation = num1.toString() + operator[op1] + num2.toString() + operator[op2] + num3.toString() + "=";
    }
    app.globalData.nowEquation = equation;
    app.globalData.nowAnswer = ans;
    return 0;
  },

  //3-2
  // 三位数加减三位数
    generateEquation9: function () {
    var equation;
    var ans;
    var op1, op2, num1, num2, num3;
    var operator = new Array(".", "+", "-");
    var operatornum = this.randInt(1, 2); //随机生成运算符数量
    if (operatornum == 1) {  //一个运算符
      op1 = this.randInt(1, 2); //随机生成运算符
      console.log(op1);
      do {
        num1 = this.randInt(100, 999);
        num2 = this.randInt(100, 999);
        ans = this.convertOp(op1, num1, num2); //计算答案
      } while (ans < 0); //直到生成算式的结果满足要求
      equation = num1.toString() + operator[op1] + num2.toString() + "=";
    }
    else if (operatornum == 2) { //两个运算符
      op1 = this.randInt(1, 2);
      op2 = this.randInt(1, 2);
      console.log(op1);
      console.log(op2);
      do {
        num1 = this.randInt(100, 999);
        num2 = this.randInt(100, 999);
        num3 = this.randInt(100, 999);
        ans = this.convertOp2(num1,op1,num2,op2,num3);
      }while((op1==2&&num2>num1)||ans < 0)
      equation = num1.toString() + operator[op1] + num2.toString() + operator[op2] + num3.toString() + "=";
    }
    app.globalData.nowEquation = equation;
    app.globalData.nowAnswer = ans;
    return 0;
  },

  // 3-3
  // 两位数乘除一位数
   generateEquation10: function () {
    var equation;
    var ans;
    var op1, op2, num1, num2, num3;
    var operator = new Array(".", "+", "-","×","÷");
    var operatornum = this.randInt(1, 2); //随机生成运算符数量
    if (operatornum == 1) {  //一个运算符
      op1 = this.randInt(3, 4); //随机生成运算符
      do {
        num1 = this.randInt(10, 99);
        num2 = this.randInt(2, 9);
        ans = this.convertOp(op1, num1, num2); //计算答案
      } while (ans < 0 || ans > 891|| ans%1!=0); //直到生成算式的结果满足要求
      equation = num1.toString() + operator[op1] + num2.toString() + "=";
    }
    else if (operatornum == 2) { //两个运算符
      op1 = this.randInt(1, 4);
      if(op1==3||op1==4) op2 = this.randInt(1, 2);
      else op2=this.randInt(3, 4);
      do {
        if(op2==3||op2==4){
          num1 = this.randInt(0, 99);
          num2 = this.randInt(10, 99);
          num3 = this.randInt(2, 9);
        }
        else{
          num1 = this.randInt(10, 99);
          num2 = this.randInt(2, 9);
          num3 = this.randInt(0, 99);
        }
        ans = this.convertOp2(num1,op1, num2,op2,num3); //计算答案
      } while (ans < 0 || ans > 990||ans%1!=0); //直到生成算式的结果满足要求
      equation = num1.toString() + operator[op1] + num2.toString() + operator[op2] + num3.toString() + "=";
    }
    app.globalData.nowEquation = equation;
    app.globalData.nowAnswer = ans;
    return 0;
  },

  //3-4
  // 三位数乘除一位数
    generateEquation11: function () {
    var equation;
    var ans;
    var op1, op2, num1, num2, num3;
    var operator = new Array(".", "+", "-","×","÷");
    var operatornum = this.randInt(1, 2); //随机生成运算符数量
    if (operatornum == 1) {  //一个运算符
      op1 = this.randInt(3, 4); //随机生成运算符
      console.log(op1);
      do {
        num1 = this.randInt(100, 999);
        num2 = this.randInt(2, 9);
        ans = this.convertOp(op1, num1, num2); //计算答案
      } while (ans < 0 || ans > 8991|| ans%1!=0); //直到生成算式的结果满足要求
      equation = num1.toString() + operator[op1] + num2.toString() + "=";
      console.log(operator[op1]);
    }
    else if (operatornum == 2) { //两个运算符
      op1 = this.randInt(1, 4);
      if(op1==3||op1==4) op2 = this.randInt(1, 2);
      else op2=this.randInt(3, 4);
      do {
        if(op2==3||op2==4){
          num1 = this.randInt(0, 999);
          num2 = this.randInt(100, 999);
          num3 = this.randInt(2, 9);
        }
        else{
          num1 = this.randInt(100, 999);
          num2 = this.randInt(2, 9);
          num3 = this.randInt(0, 999);
        }
        ans = this.convertOp2(num1,op1, num2,op2,num3); //计算答案
      } while (ans < 0 || ans > 9990||ans%1!=0); //直到生成算式的结果满足要求
      equation = num1.toString() + operator[op1] + num2.toString() + operator[op2] + num3.toString() + "=";
    }
    app.globalData.nowEquation = equation;
    app.globalData.nowAnswer = ans;
    return 0;
  },
  //随机生成min-max闭区间内的一个整数
  randInt: function (min, max) {
    var randInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return randInt;
  },
  //若op为1，则返回num1+num2的结果，若op为2，则返回num1-num2的结果
  convertOp: function (op, num1, num2) {
    var ans;
    switch (op) {
      case 1:
        ans = num1 + num2;
        break;
      case 2:
        ans = num1 - num2;
        break;
      case 3:
        ans = num1 * num2;
        break;
      case 4:
        if(num2==0) ans=-1;
        else ans = num1 / num2;
        break;
    }
    return ans;
  },
  convertOp2: function (num1, op1, num2 , op2,num3) {
    var ans;
    if(op1==3||op1==4||op2==1||op2==2){
      ans=this.convertOp(op1,num1,num2);
      if(ans==-1) return ans;
      else ans=this.convertOp(op2,ans,num3);
    }
    else{
      ans=this.convertOp(op2,num2,num3);
      if(ans==-1) return ans;
      else ans=this.convertOp(op1,num1,ans);
    }
    return ans;
  },

  // 重做错题
  generateEquation100: function () {
    var lit = wx.getStorageSync('wrongArray');
    this.setData({
      equa: lit[this.data.redonumber].equation,
      answer: (lit[this.data.redonumber].answer).toString()
    })
    app.globalData.nowEquation = lit[this.data.redonumber].equation;
    app.globalData.nowAnswer = lit[this.data.redonumber].answer;
    return 0;
  },
  ///////////////////////////////////////////////////////////////////////////

  // 删除
  inputAnswer_delete: function (e) {
    var InputAnswerNumber = this.data.InputAnswerNumber;
    var InputAnswerNumberDelete = InputAnswerNumber.split('');
    var NewInputAnswerNumber = InputAnswerNumberDelete.join('').slice(0, -1)
    this.setData({
      InputAnswerNumber: NewInputAnswerNumber
    })
  },
  // 清空
  inputAnswer_empty: function (e) {
    this.setData({
      InputAnswerNumber: '',
    })
  },
  // 点击获取数字
  inputAnswer_digital: function (e) {
    //console.log(this.data.equation);
    var InputAnswerNumber = this.data.InputAnswerNumber;
    this.setData({
      InputAnswerNumber: InputAnswerNumber + e.target.dataset.inputdigit
    })
  },
  //提交答案
  inputAnswer_confirm: function (e) {
    if (this.data.InputAnswerNumber==''){
      wx.showToast({
        icon:'none',
        title: '请输入答案!',
        duration:1000,
      })
      return;
    }
    var input = parseInt(this.data.InputAnswerNumber); //用户的回答转化成整型
    app.globalData.nowInput = input;
    // 统计做题总数
    if (app.globalData.nowplay >= 1 && app.globalData.nowplay<=3)
    {
      var num=wx.getStorageSync('exercisenum');
      if(!num){
        num=1;
      }
      else{
        num=num+1;
      }
      wx.setStorageSync('exercisenum', num);
    }
    // 回答是否正确
    var answer = app.globalData.nowAnswer;
    if (input == answer) {
      wx.showToast({
        title: '回答正确!',
        duration:1000,//显示时长
      })
      this.setData({
        InputAnswerNumber: '',
      })
      this.data.correctnum=this.data.correctnum+1;
      this.data.numpercent=((this.data.correctnum+this.data.wrongnum)*100/this.data.numname).toFixed(0);
      this.data.correctrate = ((this.data.correctnum)*100/ this.data.numname).toFixed(1);
      // 如果题目做完了就答题结束

      if(this.data.correctnum+this.data.wrongnum>=this.data.numname){
         this.setData({
           ending:true,
           holder:'',
           numpercent: this.data.numpercent,
         })
        //  折线图
        // intt是正确率
        var intt=this.data.correctrate;
        var lit = wx.getStorageSync('rateArray');
        if (!lit) {
          lit = [];
        }
        console.log(lit);
        //var lit=app.globalData.rateArray;
        console.log(lit);
        if (lit.length < 8) {
          lit.push(intt);
        }
        else {
          lit.splice(0, 1);
          lit.push(intt);
        }
        //app.globalData.rateArray=lit;
        wx.setStorageSync('rateArray', lit);
        console.log(lit);
      }
      
        //进入下一题
      else{
        if(this.data.playchoice==1){ //基础模式
          this.mode1();
        }
        else if(this.data.playchoice==2){  //强化模式的下一题逻辑
          this.mode2();
        }
        else if(this.data.playchoice==3){
          this.mode3();
        }
        
        this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
        this.setData({
          equation: this.data.equation,
          numpercent: this.data.numpercent,
        })
      }
    }
    else if (input != answer) {
      if(this.data.playchoice==3){
        this.inputAnswer_end();
        console.log(1)
        return;
      }
      wx.showToast({
        icon:'none',
        duration: 1000,//显示时长
        title: '回答错误!',
      })
      // 错题缓存
        var lit = wx.getStorageSync('wrongArray');
        if (!lit) {
          lit = [];
        }
        var wrong = {
          equation: this.data.equation,
          answer: answer,
          input: input
        }
        this.data.wrongnow.push(wrong);
        this.setData({
          wrongnow: this.data.wrongnow
        })

        lit.push(wrong);
        wx.setStorageSync('wrongArray', lit);

      //缓存错题模块
      var litmod = wx.getStorageSync('wrongmodes');
      if (!litmod) {
        litmod = [];
      }
      if(!litmod.includes(app.globalData.nowmode)){
        var  nowmd = app.globalData.nowmode;
        if (app.globalData.nowmode >= 1 && app.globalData.nowmode <= 11) {
          litmod.push(nowmd);
          wx.setStorageSync('wrongmodes', litmod);
        }
      }  
      var litmmmm = wx.getStorageSync('wrongmodes');
      console.log(litmmmm);
      // 回答错误输入框变为？
      this.setData({
        InputAnswerNumber: '',
      })
      this.data.wrongnum = this.data.wrongnum + 1;
      this.data.numpercent = ((this.data.correctnum + this.data.wrongnum) * 100 / this.data.numname).toFixed(1);
      // 题目做完结束
      if (this.data.correctnum + this.data.wrongnum == this.data.numname) {
        this.setData({
          ending:true,
          holder: '',
          numpercent: this.data.numpercent
        })
        //  折线图
        // intt是正确率
        var intt = this.data.correctrate;
        var lit = wx.getStorageSync('rateArray');
        if (!lit) {
          lit = [];
        }
        //var lit=app.globalData.rateArray;
        console.log(lit);
        if (lit.length < 8) {
          lit.push(intt);
        }
        else {
          lit.splice(0, 1);
          lit.push(intt);
        }
        //app.globalData.rateArray=lit;
        wx.setStorageSync('rateArray', lit);
        console.log(lit);
      }
      // 进入下一题
      else{
        if(this.data.playchoice==1){ //基础模式
          this.mode1();
        }
        else if(this.data.playchoice==2){  //强化模式的下一题逻辑
          this.mode2();
        }
        else {
          this.mode3();
        }
        this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
        this.setData({
          equation: this.data.equation,
          numpercent: this.data.numpercent,
        })
      }
    }
},
  //提示答题结束
  inputAnswer_end:function(){
    this.setData({
      ending:true,
      InputAnswerNumber: '',
      holder:'',
    })
    console.log(this.data.wrongnow)
  },
  // 显示答题结果
  result:function(){
    this.setData({
      lastresult:!this.data.lastresult,
      correctnum:this.data.correctnum,
      correctrate:this.data.correctrate,
    })
    if(this.data.correctnum>this.data.totalnum){
      this.setData({
        totalnum:this.data.correctnum
      })
    }
    wx.setStorageSync('total', this.data.totalnum);
    // 如果是重做错题，就将还未做的题加入到错题中
    if (app.globalData.nowgrade == 5) {
      var lit = wx.getStorageSync('wrongArray');
      var index = lit.length;
      // 如果没重做完错题
      if (index > this.data.redonumber) {
        var i;
        for (i = this.data.redonumber; i < index; i++) {
          var wrong = {
            equation: lit[i].equation,
            answer: lit[i].answer,
            input: lit[i].input
          }
          this.data.wrongnow.push(wrong);
          this.setData({
            wrongnow: this.data.wrongnow
          })
        }
      }
      var intt = this.data.correctrate;
      var ratelit = wx.getStorageSync('rateArray');
      var num = wx.getStorageSync('exercisenum');
      if (!ratelit) {
        ratelit = [];
      }
      if (ratelit.length < 8) {
        ratelit.push(intt);
      }
      else {
        ratelit.splice(0, 1);
        ratelit.push(intt);
      }
      wx.clearStorage();
      wx.setStorageSync('rateArray', ratelit);
      lit = this.data.wrongnow;
      wx.setStorageSync('wrongArray', lit);
      wx.setStorageSync('exercisenum', num);
    }
  },
  jichuplay:function(){
    if(this.data.modechoice==1){
      this.generateEquation1();
    }
  },


  mode1:function(){
    if(this.data.modechoice==1){
      this.generateEquation1();
    }
    else if(this.data.modechoice==2)
    {
      this.generateEquation2();
    }
    else if (this.data.modechoice == 3){
      this.generateEquation3();
    }
    else if (this.data.modechoice == 4){
      this.generateEquation4();
    }
    else if (this.data.modechoice == 5) {
      this.generateEquation5();
    }
    else if (this.data.modechoice == 6) {
      this.generateEquation6();
    }
    else if (this.data.modechoice == 7) {
      this.generateEquation7();
    }
    else if (this.data.modechoice == 8) {
      this.generateEquation8();
    }
    else if (this.data.modechoice == 9) {
      this.generateEquation9();
    }
    else if (this.data.modechoice == 10) {
      this.generateEquation10();
    }
    else if (this.data.modechoice == 11) {
      this.generateEquation11();
    }
  },
  mode2:function(){
    var op;
    var litmod = wx.getStorageSync('wrongmodes');
    var len=litmod.length;
    var tm=this.randInt(0, len-1);
    if(len==0) {
      op=this.randInt(1,11);
    }
    else {
      op = litmod[tm];
    }
    switch(op){
      case 1:
        this.generateEquation1();
        break;
      case 2:
        this.generateEquation2();
        break;
      case 3:
        this.generateEquation3();
        break;
      case 4:
        this.generateEquation4();
        break;
      case 5:
        this.generateEquation5();
        break;
      case 6:
        this.generateEquation6();
        break;
      case 7:
        this.generateEquation7();
        break;
      case 8:
        this.generateEquation8();
        break;
      case 9:
        this.generateEquation9();
        break;
      case 10:
        this.generateEquation10();
        break;
      case 11:
        this.generateEquation11();
        break;
    }
},
  mode3:function(){
    var op;
    if(this.data.gradechoice==3){
      op=this.randInt(1,11);
    }
    else if(this.data.gradechoice==2){
      op=this.randInt(1,7);
    }
    else{
      op=this.randInt(1,3);
    }
    switch(op){
      case 1:
        this.generateEquation1();
        break;
      case 2:
        this.generateEquation2();
        break;
      case 3:
        this.generateEquation3();
        break;
      case 4:
        this.generateEquation4();
        break;
      case 5:
        this.generateEquation5();
        break;
      case 6:
        this.generateEquation6();
        break;
      case 7:
        this.generateEquation7();
        break;
      case 8:
        this.generateEquation8();
        break;
      case 9:
        this.generateEquation9();
        break;
      case 10:
        this.generateEquation10();
        break;
      case 11:
        this.generateEquation11();
        break;
    }
  },
  onLoad: function (options) {
    this.setTime()//计时器
     let that = this
     app.globalData.nowgrade=wx.getStorageSync('grade');
     this.data.totalnum=wx.getStorageSync('total');
     this.setData({
     modechoice:app.globalData.nowmode,
     gradechoice:app.globalData.nowgrade,
     playchoice:app.globalData.nowplay,
     totalnum:this.data.totalnum
     })
     if(this.data.playchoice==3){
      this.setData({
        isWujin:true
      })
    }
    //如果选择一年级则加载一年级的题目
    if(this.data.playchoice==1){
      this.setData({
        timename: 4,
        numname: 10,
      })
      this.mode1();
    this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
    this.setData({
      equation: this.data.equation
    })
  }
  else if(this.data.playchoice==2){
    var litmod = wx.getStorageSync('wrongmodes');
    var len=litmod.length;
    if(len==0){
      this.setData({
        timename: 4,
        numname: 10,
      })
    }
    else{
      this.setData({
        timename: 4,
        numname: 10,
      })
    }
    this.mode2();
    this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
    this.setData({
      equation: this.data.equation,
      numpercent: this.data.numpercent,
    })
  }
  else if(this.data.playchoice==3){
    this.setData({
      timename: 100,
      numname: 10000,
      equation: this.data.equation,
    })
    this.mode3();
    this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
        this.setData({
          equation: this.data.equation,
          numpercent: this.data.numpercent,
        })
  }
  },
})