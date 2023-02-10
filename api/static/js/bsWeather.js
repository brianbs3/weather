

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
                        const ts = new Date(data[col][val])
                        tr.append(`<td>${ts.toLocaleString()}</td>`)
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

