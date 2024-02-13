// яндекс карты
let center = [59.93863106417265,30.323036499999905];

function init() {
	let map = new ymaps.Map('map', {
		center: center,
		zoom: 19
	});

	let placemark = new ymaps.Placemark(center, {}, {
        iconLayout: 'default#image',
		iconImageHref: 'public/images/map_vector.svg',
        iconImageSize: [16, 22],
		iconImageOffset: [18, -35]
	});

	map.geoObjects.add(placemark);
}

ymaps.ready(init);
