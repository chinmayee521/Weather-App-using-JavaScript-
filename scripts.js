let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let weather = document.getElementById("weather");
let iconfile;

const searchIp = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

//search button click event
searchBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	getWeather(searchIp.value);
	searchIp.value='';
});

const getWeather=async(city)=>{
	try{
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac89973db927720f23e6bd6cffbc1ba1`,
		{mode:'cors'}
		);

		const weatherData = await response.json();
		console.log(weatherData);
		const{name}=weatherData;
		const{feels_like}=weatherData.main;
		const{id,main}=weatherData.weather[0];
		loc.textContent=name;
		weather.textContent=main;
		tempvalue.textContent=Math.round(feels_like-273);

		if(id<300 && id>=200){
			tempicon.src = "./iconspng/thunderstorm.png"
		}

		else  if(id<400 && id>=300)
        {
            tempicon.src="./iconspng/cloud.png"
        }

        else if(id<600&& id>=500)
        {
            tempicon.src="./iconspng/rainy.png"
        }
       	else  if(id<700 && id>=600)
        {
            tempicon.src="./iconspng/snow.png"
        }
       	else  if(id<800 && id>=700)
        {
            tempicon.src="./iconspng/mist.png"
        }
     	else if(id==800)
        {
            tempicon.src="./iconspng/sunny.png"
        }
        else if(id>800)
        {
            tempicon.src="./iconspng/clouds.png"
        }
	}
	catch(error){
		alert('city not found');
	}
};

//allow location popup
window.addEventListener("load", ()=>{
	let longitude;
	let latitude;

	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition((pos)=>
		{
			longitude = pos.coords.longitude;
			latitude = pos.coords.latitude;
			const proxy = "https://cors-anywhere.herokuapp.com/"

			//fetch data from api key

			const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ac89973db927720f23e6bd6cffbc1ba1`
			fetch(api).then((response)=>{
				return response.json();
			})

			.then(data=>
			{
				const{name}=data;
				const{feels_like}=data.main;
				const{id,main}=data.weather[0];

				loc.textContent=name;
				weather.textContent=main;
				tempvalue.textContent=Math.round(feels_like-273);
				
				if(id<300 && id>200){
					tempicon.src = "./iconspng/thunderstorm.png"
				}

				else  if(id<400 && id>300)
                {
                    tempicon.src="./iconspng/cloud.png"
                }

                else if(id<600&& id>500)
                {
                    tempicon.src="./iconspng/rainy.png"
                }
               	else  if(id<700 && id>600)
                {
                    tempicon.src="./iconspng/snow.png"
                }
               	else  if(id<800 && id>700)
                {
                    tempicon.src="./iconspng/mist.png"
                }
             	else if(id==800)
                {
                    tempicon.src="./iconspng/sunny.png"
                }

                else if(id>800)
		        {
		            tempicon.src="./iconspng/clouds.png"
		        }

				console.log(data);
			})
		}		
	)}

})