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
    numpercent:0,//做题进度百分比
    timepercent:0,//时间进度百分比
    correctrate:0,//正确率
    time:0,//定时器变量
    redonumber:0//重做序号
  },
  // 计时器
  setTime() {
    let that = this
    let myTime = setInterval(function () {
      that.setData({
        time: that.data.time + 1,
        timepercent:((that.data.time*100)/(that.data.timename*60)).toFixed(1)
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
      console.log(op1);
      do {
        num1 = this.randInt(0, 99);
        num2 = this.randInt(0, 99);
        ans = this.convertOp(op1, num1, num2); //计算答案
      } while (ans < 0 || ans > 100); //直到生成算式的结果满足要求
      equation = num1.toString() + operator[op1] + num2.toString() + "=";
    }
    else if (operatornum == 2) { //两个运算符
      op1 = this.randInt(1, 2);
      op2 = this.randInt(1, 2);
      do {
        num1 = this.randInt(0, 99);
        num2 = this.randInt(0, 99);
        ans = this.convertOp(op1, num1, num2); //计算答案
      } while (ans < 0 || ans > 297); //直到生成算式的结果满足要求
      do{
        num3 = this.randInt(0, 99);
        ans = this.convertOp(op2, ans, num3);
      }while(ans < 0 || ans > 297)
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
        num1 = this.randInt(0, 999);
        num2 = this.randInt(0, 999);
        ans = this.convertOp(op1, num1, num2); //计算答案
      } while (ans < 0 || ans > 2997); //直到生成算式的结果满足要求
      equation = num1.toString() + operator[op1] + num2.toString() + "=";
    }
    else if (operatornum == 2) { //两个运算符
      op1 = this.randInt(1, 2);
      op2 = this.randInt(1, 2);
      do {
        num1 = this.randInt(0, 999);
        num2 = this.randInt(0, 999);
        ans = this.convertOp(op1, num1, num2); //计算答案
      } while (ans < 0 || ans > 2997); //直到生成算式的结果满足要求
      do{
        num3 = this.randInt(0, 999);
        ans = this.convertOp(op2, ans, num3);
      }while(ans < 0 || ans > 2997)
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
    var operator = new Array(".", "+", "-","*","/");
    var operatornum = this.randInt(1, 2); //随机生成运算符数量
    if (operatornum == 1) {  //一个运算符
      op1 = this.randInt(3, 4); //随机生成运算符
      console.log(op1);
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
    var operator = new Array(".", "+", "-","*","/");
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
    var randint = Math.floor(Math.random() * (max - min + 1)) + min;
    return randint;
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
    // 如果是重做错题，提交答案时重做题序号＋1
    if(app.globalData.nowgrade==5)
    {
      this.setData({
        redonumber: this.data.redonumber + 1,
      })
    }
    var input = parseInt(this.data.InputAnswerNumber); //用户的回答转化成整型
    app.globalData.nowInput = input;
    // 统计做题总数
    if (app.globalData.nowgrade >= 1 && app.globalData.nowgrade<=4)
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
      this.data.numpercent=((this.data.correctnum+this.data.wrongnum)*100/this.data.numname).toFixed(1);
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
        if (app.globalData.nowgrade==1)
        {
          this.generateEquation();
        }
        else if (app.globalData.nowgrade==2)
        {
          this.generateEquation2();
        }
        else if (app.globalData.nowgrade == 3) {
          this.generateEquation3();
        }
        else if (app.globalData.nowgrade == 4) {
          this.generateEquation4();
        }
        else if (app.globalData.nowgrade == 5) {
          this.generateEquation5();
        }
        this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
        this.setData({
          equation: this.data.equation,
          numpercent: this.data.numpercent,
        })
      }

    }
    else if (input != answer) {
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
      if (app.globalData.nowgrade >= 1 && app.globalData.nowgrade <= 4) {
        lit.push(wrong);
        wx.setStorageSync('wrongArray', lit);
      }

      // 回答错误输入框变为？
      this.setData({
        InputAnswerNumber: '',
      })
      this.data.wrongnum = this.data.wrongnum + 1;
      console.log(this.data.wrongnum)
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
        if (app.globalData.nowgrade == 1) {
          this.generateEquation();
        }
        else if (app.globalData.nowgrade == 2) {
          this.generateEquation2();
        }
        else if (app.globalData.nowgrade == 3) {
          this.generateEquation3();
        }
        else if (app.globalData.nowgrade == 4) {
          this.generateEquation4();
        }
        else if (app.globalData.nowgrade == 5) {
          this.generateEquation5();
        }
        this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
        this.setData({
          equation: this.data.equation,
          numpercent: this.data.numpercent
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTime()//计时器
    var that = this
    // 根据性别调整背景颜色
    if (app.globalData.yourgender == "boy") {
      that.setData({
        pageBackgroundColor: 'rbga(213,236,249,0.5)',
        groundColor: '#D5ECF9',
      });
    }
    else if (app.globalData.yourgender == "girl") {
      that.setData({
        pageBackgroundColor: 'rbga(213,236,249,0.5)',
        groundColor: '#FFCCCC',
      });
    }
    else {
      that.setData({
        pageBackgroundColor: '#FFCCCC',
        groundColor: '#FFFFFF',
      });
    }
    // 将从index界面穿过来的参数赋值
    that.setData({
      timename: options.time,
      numname: options.num,
      signname:options.thesign,
      signnumname: options.thesignnum,
    })
    var gradechoice=app.globalData.nowgrade
    //如果选择一年级则加载一年级的题目
    if(gradechoice==1){
      this.generateEquation();
      this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
      this.setData({
        equation: this.data.equation,
      })
    }
    else if(gradechoice==2)
    {
      this.generateEquation2();
      this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
      this.setData({
        equation:this.data.equa
      })
    }
    else if (gradechoice == 3) {
      this.generateEquation3();
      this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
      this.setData({
        equation: this.data.equa
      })
    }
    else if (gradechoice == 4) {
      this.generateEquation4();
      this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
      this.setData({
        equation: this.data.equa
      })
    }
    else if (gradechoice == 5) {
      this.generateEquation5();
      this.data.equation = app.globalData.nowEquation; //全局变量的equation赋值给data里的equation
      this.setData({
        equation: this.data.equa
      })
    }
  },

})