const latestVersion = "0.0.4";

$(document).ready(() => {
   console.log(`ready`)
   populateDeviceTable();
});


function populateDeviceTable(){
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
                thead.append(`<th>${header.toUpperCase()}</th>`);
            });
            
            Object.keys(data).forEach((col) => {
                let tr = $(`<tr>`)
                Object.keys(data[col]).forEach((val) => {
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
                    else{
                        tr.append(`<td>${data[col][val]}</td>`)
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

