(function(){
	var tools={
		getType:function(obj){
			return Object.prototype.toString.call(obj).split(" ")[1].replace("]","");
		},
		isNumber:function(obj){
			return typeof(obj)==="number"?true:false;
		},
		isString:function(obj){
			return typeof(obj)==="string"?true:false;
		},
		isFunction:function(obj){
			return typeof(obj)==="function"?true:false;
		},
		isUndefined:function(obj){
			return typeof(obj)==="undefined"?true:false;
		},
		isBool:function(obj){
			return typeof(obj)==="boolean"?true:false;
		},
		isArray:function(obj){
			return this.getType(obj)=="Array"?true:false;
		},
		isNull:function(obj){
			return this.getType(obj)=="Null"?true:false;
		},
		isHTMLDocument:function(obj){
			return this.getType(obj)=="HTMLDocument"?true:false;
		},
		isError:function(obj){
			return this.getType(obj)=="Error"?true:false;
		},
		isObject:function(obj){
			return this.getType(obj)=="Object"?true:false;
		},
		isRegExp:function(obj){
			return this.getType(obj)=="RegExp"?true:false;
		},
		isDate:function(obj){
			return this.getType(obj)=="Date"?true:false;
		},
		//该方法好像只在ie上测试通过
		setCookie:function(c_name, value, expiredays){
			var exdate=new Date();
			exdate.setDate(exdate.getDate() + expiredays);
			document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";path=/;expires="+exdate.toGMTString());
		},
		getCookie:function(c_name){
			if (document.cookie.length>0){
			//先查询cookie是否为空，为空就return ""
			 c_start=document.cookie.indexOf(c_name + "=")
			 //通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1
			 if (c_start!=-1){ 
			 	c_start=c_start + c_name.length+1
		            //最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置　
		            c_end=document.cookie.indexOf(";",c_start)
		            //其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...
		            //这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断　　　
		            if (c_end==-1) c_end=document.cookie.length
		            return unescape(document.cookie.substring(c_start, c_end));//unespace 解码
		        }
		    } return ""
		},
		delCookie:function(name){ 
		    var exp = new Date(); 
		    exp.setTime(exp.getTime() - 1); 
		    var cval=this.getCookie(name); 
		    if(cval!=null) 
		        document.cookie= name + "="+cval+";path=/;expires="+exp.toGMTString(); 
		},
		getDateTime:function(date,fmt){
			var myDate=new Date();
			if(date){
				myDate=new Date(date);
			}
			var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
			var mongth=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
			var day=myDate.getDate();        //获取当前日(1-31)
			var h=myDate.getHours();       //获取当前小时数(0-23)
			var m=myDate.getMinutes();     //获取当前分钟数(0-59)
			var s=myDate.getSeconds();     //获取当前秒数(0-59)

			var typeStr;
			var dateArr,timeArr;
			var result="";
			//看fmt传入的字符串分隔符是-还是/
			if(fmt.indexOf("-")!=-1){
				typeStr="-";
			}
			else if(fmt.indexOf("/")!=-1){
				typeStr="/";
			}

			dateArr=fmt.split(" ")[0];
			//如果fmt取年份
			if(dateArr.indexOf("yyyy")!=-1||dateArr.indexOf("YYYY")!=-1){
				result+=year+typeStr;
			}
			//如果fmt取月份
			if(dateArr.indexOf("mm")!=-1||dateArr.indexOf("MM")!=-1){
				result+=mongth+typeStr;
			}
			//如果fmt取日期
			if(dateArr.indexOf("dd")!=-1||dateArr.indexOf("DD")!=-1){
				result+=day;
			}
			//如果fmt直接去时间
			if((dateArr.indexOf("yyyy")==-1||dateArr.indexOf("YYYY")==-1)&&(dateArr.indexOf("mm")==-1||dateArr.indexOf("MM")==-1)
				&&(dateArr.indexOf("dd")==-1||dateArr.indexOf("DD")==-1)){
					timeArr=fmt.split(" ")[0];
				result.length>1?result+=" ":result;
				if(timeArr.indexOf("hh")!=-1||timeArr.indexOf("HH")!=-1){
					result+=h+":";
				}
				if(timeArr.indexOf("mi")!=-1||timeArr.indexOf("MI")!=-1){
					result+=m+":";
				}
				if(timeArr.indexOf("ss")!=-1||timeArr.indexOf("SS")!=-1){
					result+=s;
				}
			}
			if(fmt.split(" ")[1]){
				timeArr=fmt.split(" ")[1];
				result.length>1?result+=" ":result;
				if(timeArr.indexOf("hh")!=-1||timeArr.indexOf("HH")!=-1){
					result+=h+":";
				}
				if(timeArr.indexOf("mi")!=-1||timeArr.indexOf("MI")!=-1){
					result+=m+":";
				}
				if(timeArr.indexOf("ss")!=-1||timeArr.indexOf("SS")!=-1){
					result+=s;
				}
			}
			//这里按道理来说是应该要做一个时间格式验证的，可是返回的格式总类太多了。没想到好的方法来验证
			return result;
		} 
	}
	window.tools=tools;
})()