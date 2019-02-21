/*
 *
 *负责处理token 
 * 
 */

export function setToken(item){
	localStorage.setItem("userinfo",JSON.stringify(item))
}

export function getToken(){
	return JSON.parse(localStorage.getItem("userinfo"));
	//return jsonStr
}

export function removeToken(){
	localStorage.removeItem("userinfo")
}