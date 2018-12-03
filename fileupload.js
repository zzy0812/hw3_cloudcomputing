
 window.onload = function () {
 	// var image_upload = document.getElementById('image_upload');
 	var sendbtn = document.getElementById('submit');
  var sendqbtn = document.getElementById('submitq');
  var image_display = document.getElementById('image_display');
  var upload_success_area = document.getElementById('upload_success_area');
 	sendbtn.onclick = function(){
 		var input = $("#fileupload").val();
 		console.log(input)
 		console.log('uploading file.....')
    upload_success_area.innerHTML = '';

 		// fileInput is an HTMLInputElement: <input type="file" id="myfileinput" multiple>
		var fileInput = document.getElementById("fileupload");

		// files is a FileList object (similar to NodeList)
		var file = fileInput.files[0];
		console.log(file)
    var r = new FileReader();
    r.onload = function(){
      console.log(r.result)
    }
    r.readAsDataURL(file); //Base64

    var formdata1=new FormData();// 创建form对象
    // formdata1.append('img',file,file.name);// 通过append向form对象添加数据,可以通过append继续添加数据
formdata1.append('img',file);
    let config = {
    headers:{'Content-Type':'multipart/form-data; boundary=${data._boundary}',
         "X-Api-Key": "ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh" 
        }
};  //添加请求头
  url = 'https://xbu0gisyt6.execute-api.us-east-1.amazonaws.com/development/upload/' + file.name
    axios.put(url,file,config).then(response=>{   //这里的/xapi/upimage为接口
    console.log(response.data)
    upload_success_area.innerHTML += 'Successfully uploaded the picture!';


})
}


  sendqbtn.onclick = function(){
    var input = $("#q").val();
    console.log(input)
    console.log('processing your input')

    var apigClient = apigClientFactory.newClient({
    apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
});
    var params = {
    //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
    "q":input
};
    var body = {
        //This is where you define the body of the request
    };
    var additionalParams = {
        //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
        headers: {
            // param0: '',
            // param1: ''
        },
        queryParams: {
            
        }
    };

    apigClient.searchGet(params, body, additionalParams)
        .then(function(result){
            //This is where you would put a success callback
            image_display.innerHTML = '';
            if (typeof(result.data.body) == 'undefined'){
               image_display.innerHTML += 'Sorry, there is no matching image!';
            }
            else{
              console.log(result.data.body)
                console.log(typeof result.data.body)
                var string_img_list = result.data.body;
                var object_img_list = string_img_list.substring(1, string_img_list.length-1);
                var array = object_img_list.split(",");
                console.log(array)
                console.log(typeof array)
                var src_host = "https://s3.amazonaws.com/photoalbumcc/";
                if (array[0].length == 0){
                  image_display.innerHTML += 'Sorry, there is no matching image!';
                }
                else{
                  image_display.innerHTML += 'Success! Here is the query result(s): <br>';
                  for (var i = 0; i < array.length; i++){
                      console.log(array.length)
                      var img_name = ""
                      for (var j = 0; j < array[i].length; j++){
                        
                        if (array[i][j] != " " && array[i][j] != '"'){
                          img_name += array[i][j];
                        }
                      }
                      src = src_host+img_name;

                      image_display.innerHTML += '<img src=' + src+' style="height:500px"> <br>';
                    }
                }
            }
                
            console.log('success')
        }).catch( function(result){
            //This is where you would put an error callback
        });

 
}

}

// var apigClient = apigClientFactory.newClient({
//     apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
// });
 
// var params = {
//     //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
//     // param0: '',
//     // param1: ''
//     'Content-Type': 'image/jpeg'
//     // 'Content-Type':'application/json'
// };
// var body = {
// 	// 'fdsafdsaf'
// 	files
//     //This is where you define the body of the request
// };
// var additionalParams = {
//     //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
//     headers: {
//         // param0: '',
//         // param1: ''


//     },
//     queryParams: {
//         // param0: '',
//         // param1: ''
//     }
// };

// apigClient.uploadPut(params, body, additionalParams)
//     .then(function(result){
//         //This is where you would put a success callback
//         console.log(result)
//     }).catch( function(result){
//         //This is where you would put an error callback
//         console.log('failure')
//     });

 //     axios({
    //     //url: "  https://azpx1ffscc.execute-api.us-east-2.amazonaws.com/dev/chatbot",
    //     url: "https://3mb160gh8b.execute-api.us-east-1.amazonaws.com/chatbotStage/chatbot",
    //     method: 'POST',
    //     headers :{
    //         //"X-Api-Key": "eo1d1X9N5Q5jMUgLlgaHs3g1S0B3fjqP6XkKlqWn"
    //         "X-Api-Key": "KXHRURveoY48eQmB2yj117nWLRWVfgRjDptFNUFb"
    //     },
    //     data: {
    //         "input": input
    //     },
    //     }).then(response => {
        // console.log(response);
        // chat_ul.innerHTML += '<li ><span class = "spanleft">' + response.data.body.substring(1, response.data.body.length-1) + '</span>' + '</li>';
    // }).catch(error => {
    //     c
    

    
   //  var a = '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'
   //  var data = new FormData();
   //  // formdata1.append('img',file,file.name);
   //  // formdata1.append('action', 'ADD');
   //  // formdata1.append('param',0);
   //  // formdata1.append('secondParam',0);
   //  // formdata1.append('file', new Blob(file,{type:'image/jpeg'}));

  
 	 // data.append('file', file, file.name);
	// import request from 'utils/request'
 //     request.put('https://xbu0gisyt6.execute-api.us-east-1.amazonaws.com/development/upload/HAHA.jpeg', data, {
 //    headers: {
 //      'Content-Type': 'multipart/form-data; boundary=${data._boundary}',
 //    },
 //    timeout: 30000,
 //  });

 // //    var xhr = new XMLHttpRequest();
	// // xhr.open("PUT", "https://xbu0gisyt6.execute-api.us-east-1.amazonaws.com/development/upload/HAHA.jpeg");
	// // xhr.send(formdata1);
 //    const config = {
 //    	headers:{
 //    		"X-Api-Key": "ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh",
 //    		"Content-Type":"multipart/form-data"
    		
 //    }
 //    };

 //    axios.put('https://xbu0gisyt6.execute-api.us-east-1.amazonaws.com/development/upload/rrrrrb.jpeg',a,config).then(response =>{
 //    	console.log(response.data)
 //    })


//     axios(
//     		{
//                 //url: "  https://azpx1ffscc.execute-api.us-east-2.amazonaws.com/dev/chatbot",
//                 url: "https://xbu0gisyt6.execute-api.us-east-1.amazonaws.com/development/upload/yingyingying.jpeg",
//                 method: 'PUT',
//                 headers :{
//                     //"X-Api-Key": "eo1d1X9N5Q5jMUgLlgaHs3g1S0B3fjqP6XkKlqWn"
//                     "X-Api-Key": "ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh",
//                     "Content-Type": "image/jpeg"
//                 },
//                 data: {
//                     // "Authorization": result.getIdToken().getJwtToken(),
//                     "input":"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"
//                 }
//            }
//                 ).then(response => {
//                 console.log(response);
                
//             }).catch(error => {
//                 console.log(error);
//             });


// 	}
// }


		// object for allowed media types
		// var accept = {
		//   binary : ["image/png", "image/jpeg"],
		//   text   : ["text/plain", "text/css", "application/xml", "text/html"]
		// };

		// var file;

		// for (var i = 0; i < files.length; i++) {
		//   file = files[i];

		//   // if file type could be detected
		//   if (file !== null) {
		//     if (accept.binary.indexOf(file.type) > -1) {
		//       // file is a binary, which we accept
		//       var data = file.getAsBinary();
		//       console.log(data)
		//     } else if (accept.text.indexOf(file.type) > -1) {
		//       // file is of type text, which we accept
		//       var data = file.getAsText();
		//       // modify data with string methods
		//       console.log(data)
		//     }
		//   }
		// }	


 		// var apigClient = apigClientFactory.newClient({
 		// 			apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
 		
 		// const config =  {
   //              apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh',
   //              invokeUrl:'https://1ampu9tfzg.execute-api.us-east-1.amazonaws.com/test'
   //              }

  	// var apigClient = apigClientFactory.newClient({
   //              apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
   //              // invokeUrl:'https://1ampu9tfzg.execute-api.us-east-1.amazonaws.com/test'
   //              });

//    var apigClient = apigClientFactory.newClient({
//                       apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
//                     });
//    var params = {
//     //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
//     "item": "fdfd.txt",
//      "Content-Type":"application/xml",
     
// };
// var body = {
//     //This is where you define the body of the request
//     "input":'dfdfd'
// };
// var additionalParams = {
//     //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
//     headers: {
//         "Access-Control-Allow-Origin":'*'
//     },
//     queryParams: {
        
//     }
// };

// apigClient.uploadItemPut(params, body, additionalParams)
//     .then(function(result){
//         console.log('Sueccess!')
//     }).catch( function(result){
//         //This is where you would put an error callback
//         console.log('Sueccess!')
//     });



// var apigClient = apigClientFactory.newClient({
//                       apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
//                     });
//         var params = {
//           // This is where any modeled request parameters should be added.
//           // The key is the parameter name, as it is defined in the API in API Gateway.
//           // apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
         
//         };

//         var body = {
//             // "input": input
//           // This is where you define the body of the request,
//           input
//         };

//         var additionalParams = {
//           // If there are any unmodeled query parameters or headers that must be
//           //   sent with the request, add them here.
//           headers: {
//             "x-api-key":'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh',
//             // "Content-Type": 'application/xml'
//           },
//           queryParams: {
            
//           }
//         };

        // apigClient.uploadPut(null, body)
        //     .then(function(result){
        //     // Add success callback code here.
        //     console.log(result);
        //     // chat_ul.innerHTML += '<li ><span class = "spanleft">' + result.data.body.substring(1, result.data.body.length-1) + '</span>' + '</li>';
    


        //     }).catch( function(result){
        //       // Add error callback code here.
        //     });


// const userAction = async () => {
//   const response = await fetch('https://1ampu9tfzg.execute-api.us-east-1.amazonaws.com/test/thisistotests3proxy/helloworld.txt');
//   const myJson = await response.json(); //extract JSON from the http response
//   console.log(myJson)
//   // do something with myJson
// }
// //    var request = new XMLHttpRequest();

// // Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'https://1ampu9tfzg.execute-api.us-east-1.amazonaws.com/test/thisistotests3proxy/helloworld.txt', true);

// request.onload = function () {
//   // Begin accessing JSON data here
//   }
//  request.send();


// Send request


 //    var apigClient = apigClientFactory.newClient(
 //    {
 //                      apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh',
 //                      region: 'us-east-1'
                    
 //                });
 //  	var body = {
 //            // "async": true,
 //            // "crossDomain": true,
 //            "url": "https://1ampu9tfzg.execute-api.us-east-1.amazonaws.com/test/thisistotests3proxy/helloworld.txt",
 //            "method": "GET",
 //            "headers": {
 //                // "cache-control": "no-cache"
 //            }
 //            // "data": {}
 //            // "data": querystring.stringify('DD')
 //        };

 //  	var params = {
 //        //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
 //        //  userId: '1234',
 //      };
 //      // Template syntax follows url-template https://www.npmjs.com/package/url-template
 //  	var pathTemplate = '/{folder}/{item}'
 //  	var method = 'GET';
 //  	var additionalParams = {
 //      //If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
 //      headers: {

 //            },
 //      queryParams: {
 //        // search_keyword: 'Ambassador'
 //              }
 //    };
	// // apigClient.invokeApi(params, pathTemplate, method, additionalParams)
	// //    		.then((result) => {
	// //    			console.log(result)
	// //    		})
	// //    		.catch((error) => {
	// //    			 console.log(error)
	// //    		})
   
 //   	apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
 //   		.then((result) => {
 //   			console.log(result)
 //   		})
 //   		.catch((error) => {
 //   			 console.log(error)
 //   		})
 //   	}
 //  }
// debugger
//     apigClient.invokeApi(params, pathTemplate, method, additionalParams)
//              .then(function(result)
//                 {
//                     //This is where you would put a success callback
//                     return JSON.parse(result.data)

//                 }).catch( function(result){
//                     //This is where you would put an error callback
//                 })
// }			





 		// });

 		// var params = {
 		// 	folder:'thisistotests3proxy'
 		// 	item:'helloworld.txt'
 		// };

 		// var method = 'GET';


 		// var result1 = apigClient.invokeApi(params,pathTemplate,method,additionalParams,data) 
		 //        .then(function(result){
		 //            //never hit :(
		 //            console.log(result);
		 //         }).catch( function(result){
		 //              //never hit :(
		 //             console.log(result);
		//         });;

 	// 	var filepathname = './items/';

		// var filename = 'image1.png';

		// fs.stat(filepathname+filename, function (err, stats) {

		//     var fileSize = stats.size ;

		//     fs.readFile(filepathname+filename,'binary',function(err,data){ 

		//         var len = data.length;
		//         console.log('file len' + len);

		//         var pathTemplate = '/my-test-bucket/' +filename ; 
		//         var method = 'PUT';

		//         var params = {
		//             folder: '',
		//             item:''
		//         };
		//         var additionalParams = {
		//             headers: {
		//              'Content-Type': 'application/octet-stream',
		//               //'Content-Type': 'image/gif',
		//              'Content-Length': len
		//            }
		//         };

		//         var result1 = apigClient.invokeApi(params,pathTemplate,method,additionalParams,data) 
		//         .then(function(result){
		//             //never hit :(
		//             console.log(result);
		//          }).catch( function(result){
		//               //never hit :(
		//              console.log(result);
		//         });;

		//     }); 

		// });



 		// var apigClient = apigClientFactory.newClient({
 		// 			apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
 		// });

 		// var params = {
   //        // This is where any modeled request parameters should be added.
   //        // The key is the parameter name, as it is defined in the API in API Gateway.
   //        // apiKey: 'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
         
   //      };

   //      var body = {
   //          input
   //        // This is where you define the body of the request,
   //      };

   //      var additionalParams = {
   //        // If there are any unmodeled query parameters or headers that must be
   //        //   sent with the request, add them here.
   //        headers: {
   //          "x-api-key":'ovHnr77N8a37ZUhESH1Ui9nrc61dcQNB8sqYHXMh'
   //        },
   //        queryParams: {
            
   //        }
   //      };

   //      apigClient.'thisistotests3proxyhelloworld.tsxtGet'(null, body)
   //          .then(function(result){
   //          // Add success callback code here.
   //          console.log(result);
   //          // chat_ul.innerHTML += '<li ><span class = "spanleft">' + result.data.body.substring(1, result.data.body.length-1) + '</span>' + '</li>';
   //  		console.log('Successfully uploaded!!')


   //          }).catch( function(result){
   //            // Add error callback code here.
   //          });


            

 