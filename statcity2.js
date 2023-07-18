let AccessCode = "";

// Post for getting new Acces Token

async function getAccessTokens() {

    const request = await fetch("https://www.strava.com/oauth/token?client_id=105639&client_secret=7189c307da8243d844c6baa42687e07b6bf2602f&refresh_token=12e9e2963c28b90e2c2da47839f26875c76952f1&grant_type=refresh_token", {
        "method": "POST",
        "headers": {
            'Content-Type': 'Application/json'
        }
    });
    const response = await request.json();
    console.log(response);        
    AccessCode = response.access_token;    
    document.getElementById('test3').innerHTML = AccessCode;  

    
        //   gets all activities

    async function getActivities() {
    
        const endpoint = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${ AccessCode }`);
        const data = await endpoint.json();
        console.log(data);
        
        document.getElementById('test4').innerHTML = data[1].name;    
    
        for (let index = 0; index < data.length; index++) {           
            const distanceraw = data[index].distance;
            const distanceraw2 = distanceraw / 1000;
            const newDistance = distanceraw2.toFixed(2) + " " + "km";                
        }    
    
        function myFunction(raw) {
            return raw *2;
        }
    
        const distanceraw = data[1].distance;
        const distanceraw2 = distanceraw / 1000;
        const newDistance = distanceraw2.toFixed(2);
    
        document.getElementById('test5').innerHTML = data[1].sport_type;
        document.getElementById('test6').innerHTML = newDistance + "km";  
        
        // distance 5450.5 / moving 2145 = 2.541  meters/second
        //  35.75 / 5.4505 = 6.559     time/km
        // movingtimeraw2 / newDistance
        // average speed is 2.541   needs to reed 6:34
        
        //  moving 35:45   this is actuall 35.75
        //  dist  5.45
        //  equals  6.559  remove 6 to leave decimal
        //  .55963303 x 60 = 33.5779818
        //  move dec 2 to the left = .335779818
        // rounded up = .34
        // add orignal 6 back = 6:34      mathches Strava App
       
        const movingtimeraw = data[1].moving_time;  // 2145  seconds
                                                    // 7488
        const movingtimeraw2 = movingtimeraw / 60;  // converts to min.....35.75   .75 = 45 secs   35mins 45 secs
                                                    // 124.80
        const movingtimetrimmed = Math.trunc(movingtimeraw2); // grabs the 35 drops the .75
                                                            //  124
        const movingtimetrimmed2 = movingtimetrimmed / 60;  // retrievs 0.5833333
                                                            // 2.06666667
        const movingtimetrimmed3 = Math.trunc(movingtimetrimmed2);// drops the decimals leaving 0
                                                                // 2  *****hours****
                                                                
        const movingtimedecimal = movingtimeraw2 - movingtimetrimmed;  // 35.75 - 35 = 0.75   drops the whole num
                                                                    //124.80 - 124 = 0.7999999
        const movingtimedecimal60 = movingtimedecimal * 60;  // .75 * 60 = 45.0  ***** seconds*****
                                                            // 0.799999 * 60 = 47.9999999
        const movingtimedecimal60toseconds = movingtimedecimal60 / 100;  // gets 0.450 
                                                                        // 0.4799999999
        const movingtimedecimal60tosecondsrounded = movingtimedecimal60toseconds.toFixed(2); // rounds to 0.48
        const secondstrimmed = movingtimedecimal60tosecondsrounded.toString().slice(2); // drops 0. leaves 48 *******

        const movingtime = movingtimetrimmed + movingtimedecimal60toseconds;  // gets 35.45
                                                                            
        const movingtimefinal = movingtime.toFixed(2);
    
        const paceraw = movingtimeraw2 / newDistance;
        const paceraw2 = Math.trunc(paceraw);
        const pacerawdecimal = paceraw - paceraw2;
        const pacerawdecimal2 = pacerawdecimal * 0.6;
        const pacerawdecimal2trimmed = pacerawdecimal2.toFixed(2);
        const pace = paceraw2.toString() + ":" + pacerawdecimal2trimmed.toString().slice(2);             
        
        document.getElementById('test7').innerHTML = movingtimetrimmed.toString() + " min" + "  " + secondstrimmed + " secs";
        document.getElementById('test8').innerHTML = movingtimeraw2;
        document.getElementById('test9').innerHTML = data[1].average_heartrate.toString();
        document.getElementById('test10').innerHTML = movingtimetrimmed3;    
        document.getElementById('test14').innerHTML = movingtimefinal ;
    }
    
    getActivities()
        .then(response => {
            console.log('Athlete ok');
        })
        .catch(error => {
            console.log('Athlete NOT ok');
            console.error(error)
    });
}

getAccessTokens()
    .then(response => {
        console.log('Access ok');
    })
    .catch(error => {
        console.log('Access NOT ok');
        console.error(error)
});




//  Weather information Below


async function getCurrentConditions() {

    const endpoint = new URL("http://dataservice.accuweather.com/currentconditions/v1/55489?apikey=Qc1ej31WWglKsRnGyRNbRjA5atq9ei1H");
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    document.getElementById('test').innerHTML = data[0].Temperature.Metric.Value.toString();
    document.getElementById('test2').innerHTML = data[0].WeatherIcon; 
    var icon = data[0].WeatherIcon;  //get icon number
    const length = icon.toString();    // convert to string
    const length2 = length.length;   // coumt string length

    // if string is only one character  add a 0 to the beginning
    if (length2 == 1) {

        icon = "0"+ length;
        
        console.log('if executed')
      }




    document.getElementById('test11').innerHTML = icon;    

    document.getElementById('test12').src = `https://developer.accuweather.com/sites/default/files/${ icon }-s.png`;
    // `https://www.strava.com/api/v3/athlete/activities?access_token=${ AccessCode }`
    //    https://developer.accuweather.com/sites/default/files/01-s.png
}

getCurrentConditions()
    .then(response => {
        console.log('weather ok');
    })
    .catch(error => {
        console.log('weather NOT ok');
        console.error(error)
});