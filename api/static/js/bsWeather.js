const latestVersion = "0.0.6";

$(document).ready(() => {
   console.log(`ready`)
   populateDeviceTable();
});

function c2f(c) {
    return (c * (9.0 / 5.0)) + 32.0
}

function populateDeviceTable(){
    const visibleCols = [
        'ID',
        'HOSTNAME',
        'MAC',
        'LOCATION',
        'POLL_INTERVAL',
        'VERSION',
        'IP',
        'UPDATED',
        'HUMIDITY',
        'ONEWIRE_TEMP_C',
        'HUMIDITY_TEMP_C',
        'ONBOARD_TEMP_C',
        'INSTALLED',
        'HASCASE',
        'SUBLOCATION',
        'NOTES'
    ]
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        processData: true,
        url: "/pico",
        success: function(data){
            let thead = $(`<thead>`);
            let tbody = $(`<tbody>`);
            Object.keys(data[0]).forEach((header) => {
                if(visibleCols.includes(header.toUpperCase())){
                    thead.append(`<th>${header.toUpperCase()}</th>`);
                }
            });
            
            Object.keys(data).forEach((col) => {
                let tr = $(`<tr>`)
                Object.keys(data[col]).forEach((val) => {
                    if(visibleCols.includes(val.toUpperCase())){
                        if(val === "updated"){
                            let updatedClass = "btn btn-success";
                            const ts = moment(data[col][val]);
                            if(ts < moment().subtract(5, 'minutes'))
                                updatedClass = "btn btn-danger";
                            tr.append(`<td><button type=button class='${updatedClass}'>${ts.format('DD-MMM-YYYY hh:mm:ss A')}</button></td>`)
                        }
                        else if(val === "version") {
                            let versionClass = "btn btn-success"
                            if(data[col][val] !== latestVersion)
                                versionClass = "btn btn-danger"
                            tr.append(`<td><button type=button class='${versionClass}'>${data[col][val]}</button></td>`)
                        }
                        else if(val === "onewire_temp_c"){
                            tr.append(`<td>${parseFloat(c2f(data[col][val])).toFixed(3)} &#176;F (${parseFloat(data[col][val]).toFixed(3)} &#176;C)</td>`)
                        }
                        else if(val === "ledColor"){
                            tr.append(`<td><div class='led led_${data[col][val]}'>LED</div></td>`)
                        }
                        else{
                            tr.append(`<td>${data[col][val]}</td>`)
                        }
                    }
                    
                    tbody.append(tr);
                })
                
            });
            $('#picoDeviceTable').append(thead)
            $('#picoDeviceTable').append(tbody);
        },
        error: function(jqXHR, textStatus, errorThrown){
        if(jqXHR.readyState == 0)
            window.location.replace(global_site_redirect);
            $("#bsNetworkStatus").html(jqXHR);
        }
    });
}

