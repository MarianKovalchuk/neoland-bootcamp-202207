function searchVehiclesFull(query) {
    return fetch('http://b00tc4mp.herokuapp.com/api/hotwheels/vehicles?q=' + query)
        .then(res => res.json())
        .then(vehicles => 
            Promise.all(
                vehicles.map(vehicle => 
                    fetch('http://b00tc4mp.herokuapp.com/api/hotwheels/vehicles/' + vehicle.id).then(res => res.json())
                )
            )
        )
}

searchVehiclesFull('mario')
    .then(vehicles => console.table(vehicles))

// VM187:14 
// (index)
// id
// name
// image
// year
// color
// maker
// collection
// style
// description
// price
// url
// 0	'DHT14'	'Cool One (Super Mario Theme)'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DHT14_c_16_003.png'	2016	'red'	'nintendo'	'hw-screen-time'	'entertainment'	'The Cool One (Super Mario Theme) (DHT14) belongs t…is unit is RED and its brand (maker) is Nintendo.'	150	'https://play.hotwheels.com/es-es/collection/detail?carId=DHT14'
// 1	'DJK67'	'Bully Goat'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DJK67_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Bully Goat (DJK67) belongs to the SUPER MARIO … MULTI and its brand (maker) is Super Mario Bros.'	138	'https://play.hotwheels.com/es-es/collection/detail?carId=DJK67'
// 2	'DJK68'	'Vandetta'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DJK68_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Vandetta (DJK68) belongs to the SUPER MARIO BR… MULTI and its brand (maker) is Super Mario Bros.'	134	'https://play.hotwheels.com/es-es/collection/detail?carId=DJK68'
// 3	'DJK69'	'Flathead Fury'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DJK69_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Flathead Fury (DJK69) belongs to the SUPER MAR… MULTI and its brand (maker) is Super Mario Bros.'	144	'https://play.hotwheels.com/es-es/collection/detail?carId=DJK69'
// 4	'DJK70'	'Super Van'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DJK70_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Super Van (DJK70) belongs to the SUPER MARIO B… MULTI and its brand (maker) is Super Mario Bros.'	136	'https://play.hotwheels.com/es-es/collection/detail?carId=DJK70'
// 5	'DJK71'	'Bread Box'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DJK71_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Bread Box (DJK71) belongs to the SUPER MARIO B… MULTI and its brand (maker) is Super Mario Bros.'	136	'https://play.hotwheels.com/es-es/collection/detail?carId=DJK71'
// 6	'DJK72'	'RYURA LX'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DJK72_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The RYURA LX (DJK72) belongs to the SUPER MARIO BR… MULTI and its brand (maker) is Super Mario Bros.'	134	'https://play.hotwheels.com/es-es/collection/detail?carId=DJK72'
// 7	'DJK73'	'Cruise Bruiser'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DJK73_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Cruise Bruiser (DJK73) belongs to the SUPER MA… MULTI and its brand (maker) is Super Mario Bros.'	146	'https://play.hotwheels.com/es-es/collection/detail?carId=DJK73'
// 8	'DJK74'	'RD-08'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DJK74_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The RD-08 (DJK74) belongs to the SUPER MARIO BROS … MULTI and its brand (maker) is Super Mario Bros.'	128	'https://play.hotwheels.com/es-es/collection/detail?carId=DJK74'
// 9	'DMH74'	'Mario'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DMH74_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Mario (DMH74) belongs to the SUPER MARIO BROS … MULTI and its brand (maker) is Super Mario Bros.'	128	'https://play.hotwheels.com/es-es/collection/detail?carId=DMH74'
// 10	'DMH75'	'Luigi'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DMH75_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Luigi (DMH75) belongs to the SUPER MARIO BROS … MULTI and its brand (maker) is Super Mario Bros.'	128	'https://play.hotwheels.com/es-es/collection/detail?carId=DMH75'
// 11	'DMH76'	'Yoshi'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DMH76_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Yoshi (DMH76) belongs to the SUPER MARIO BROS … MULTI and its brand (maker) is Super Mario Bros.'	128	'https://play.hotwheels.com/es-es/collection/detail?carId=DMH76'
// 12	'DMH77'	'Princess Peach'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DMH77_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Princess Peach (DMH77) belongs to the SUPER MA… MULTI and its brand (maker) is Super Mario Bros.'	146	'https://play.hotwheels.com/es-es/collection/detail?carId=DMH77'
// 13	'DMH78'	'Toad'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DMH78_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Toad (DMH78) belongs to the SUPER MARIO BROS c… MULTI and its brand (maker) is Super Mario Bros.'	126	'https://play.hotwheels.com/es-es/collection/detail?carId=DMH78'
// 14	'DMH79'	'Bowser'	'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/DMH79_c_16_003.png'	2016	'multi'	'super-mario-bros'	'super-mario-bros'	'character-car'	'The Bowser (DMH79) belongs to the SUPER MARIO BROS… MULTI and its brand (maker) is Super Mario Bros.'	130	'https://play.hotwheels.com/es-es/collection/detail?carId=DMH79'
// Array(15)
// ﻿
