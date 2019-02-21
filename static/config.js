import { Indicator,Toast,MessageBox } from 'mint-ui';
export const baseConfig = {
	api:'/api/p/',
	version:"2.3.0"
}

export const showMessage = function (message,title,confirmButtonText,fun){
	MessageBox({
		title: title,
	  	message: message,
	  	showCancelButton: true,
	  	confirmButtonText:confirmButtonText
	}).then(action => {
		console.log(action)
		if(action==="confirm"){
			if(fun){
				console.log(111)
				fun();
			}
			
		}
	});
}