var world_response = null;
var world_data = null

const GetData = async() => {
    world_response = await fetch('https://covid-19.dataflowkit.com/v1/world')
    world_data = await world_response.json();
    document.getElementById('world-data').innerHTML = 
    `<h6>New cases today: ${world_data['New Cases_text'].substr(1)}<h6>
    <h6>Total worldwide cases: ${world_data['Total Cases_text']}</h6>`;
}
GetData();

const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","USA","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
let optionList = document.getElementById('countries').options;

countries.forEach(country => {
    optionList.add(new Option(country,country,false));
})

const getCountryData = async(country) => {
    if(country.value!=="") {
        //const world_response = await fetch('https://covid-19.dataflowkit.com/v1/world')
        //const world_data = await world_response.json();
        const country_response = await fetch(`https://covid-19.dataflowkit.com/v1/${country.value}`);
        const country_data = await country_response.json();
        document.getElementById('data').innerHTML = 
        `
        <h5>Country: ${country_data['Country_text']}</h5>
        <h6>New cases: ${country_data['New Cases_text'].substr(1)}</h6>
        <h6>New deaths: ${country_data['New Deaths_text'].substr(1)}</h6>
        <h6>Total cases: ${country_data['Total Cases_text']}</h6>
        <h6>Total deaths: ${country_data['Total Deaths_text']}</h6>
        <h6>Last update: ${country_data['Last Update']}</h6>
        <div class="plot" id="plot" style=";height:250px"></div>
        `
        
        let data = [{
            values: [parseInt(country_data['Total Cases_text'].replace(/,/g,"")),parseInt(world_data['Total Cases_text'].replace(/,/g,""))],
            labels: [country_data['Country_text'], world_data['Country_text']],
            type: 'pie'
        }];
        if (country_data['Country_text']!==world_data['Country_text'])  Plotly.newPlot(document.getElementById('plot'),data);
        else  document.getElementById('data').innerHTML = "Unable to get data." 
    } else {
        document.getElementById('data').innerHTML = ""
    }
};

document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('dark');
    checkbox.addEventListener('change', function(){
        var element = document.body;
        element.classList.toggle("dark-mode");
    });
});

document.addEventListener('DOMContentLoaded', function() {
    console.log("hehe2");
    var select = document.getElementById('countries');
    console.log("first");
    select.addEventListener('change', (event) => getCountryData(event.target),false);      
})