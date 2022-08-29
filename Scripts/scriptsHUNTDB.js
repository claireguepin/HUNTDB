
function generate_table() {

    // Properties selected
    const propchall = ["CatCheck", "ModCheck", "MotCheck", "ResCheck",
                       "PerCheck", "CodCheck", "ZonCheck", "ComCheck",
                       "AccCheck", "IntCheck", "MaxCheck", "SpeCheck",
                       "LCuCheck", "UncCheck"];
    const propflall = ["Catflag", "Modflag", "Motflag", "Resflag",
                       "Perflag", "Codflag", "Zonflag", "Comflag",
                       "Accflag", "Intflag", "Maxflag", "Speflag",
                       "LCuflag", "Uncflag"];
    const propnaall = ["Transient category", "Modeling", "Motivation", "Results",
                       "Perspectives", "Codes", "Zones", "Composition",
                       "Acceleration", "Interactions", "Maximum energies", "Spectra", "Lightcurves",
                       "Uncertainties"];

    const properties = ["Papflag"];
    const propertiesna = ["Paper"];

    for (var ip = 0; ip < propchall.length; ip++) {
        var checkBox = document.getElementById(propchall[ip]);
        if (checkBox.checked == true){
            properties.push(propflall[ip])
            propertiesna.push(propnaall[ip])
        }
    }

    // Sources selected
    const sourall = ["TDECheck", "AGNCheck", "SLSCheck",
                     "FAGNDCheck", "SGRBBNSMCheck", "GRBCheck", "CGRBCheck",
                     "SNNCheck", "FBOTCheck", "MTRCheck", "PSRCheck",
                     "XRBCheck", "BBHMCheck", "WDMCheck", "MBHMCheck"];
    const sournaall = ["TDE", "AGN", "SLS",
                       "FAGND", "SGRBBNSM", "GRB", "CGRB",
                       "SNN", "FBOT", "MTR", "PSR",
                       "XRB", "BBHM", "WDM", "MBHM"];

    const sources = [];

    for (var ip = 0; ip < sourall.length; ip++) {
        var checkBox = document.getElementById(sourall[ip]);
        if (checkBox.checked == true){
            sources.push(sournaall[ip])
        }
    }

    // Find a <table> element with id="myTable":
    var table = document.getElementById("myTable");

    // Start by removing all lines
    for (var it = table.rows.length-1; it >= 0; it--){
        table.deleteRow(it);
    }

    // Find headers
    var yh = document.createElement("TR");
    table.appendChild(yh);

    // Add missing columns for properties
    for (var ih = 0; ih < properties.length; ih++) {
        var z = document.createElement("TH");
        var t = document.createTextNode(propertiesna[ih]);
        z.appendChild(t);
        yh.appendChild(z);
    }

    // Add missing lines for sources
    for (var is = 0; is < sources.length; is++) {
        var data = document.getElementsByClassName(sources[is]);
        var checkBox = document.getElementById("yrCheck");
        var yrval = document.getElementById("yrValue").value;
        if (checkBox.checked == true) {
            var datayr = document.getElementsByClassName(sources[is]+" "+yrval);
        }
        else{
            var datayr = data
        }
        for (var i = 0; i < datayr.length; i++) {
            var y = document.createElement("TR");
            table.appendChild(y);
            for (ic = 0; ic < properties.length; ic++){
                var z = document.createElement("TD");
                let clone = datayr[i].getElementsByClassName(properties[ic])[0].cloneNode(true);
                y.appendChild(clone);
            }
        }
    }
}

function descSource(y1, y2) {
    const desclist = ["descAGN", "descGRB", "descTDE",
                      "descSNe", "descNS", "descCOM",
                      "descFBOT", "descXRB"]
    const figlist = ["figAGN", "figGRB", "figTDE",
                     "figSNe", "figNS", "figCOM",
                     "figFBOT", "figXRB"]
    var x1 = document.getElementById(y1);
    var x2 = document.getElementById(y2);
    if (x1.style.display === "none") {
        x1.style.display = "block";
        x2.style.color = "darkblue";
//        x2.style.fontWeight = "bold";
        for (var i = 0; i < desclist.length; i++) {
            if (y1 != desclist[i]) {
                var x1loc = document.getElementById(desclist[i]);
                var x2loc = document.getElementById(figlist[i]);
                x1loc.style.display = "none";
                x2loc.style.color = "black";
//                x2loc.style.fontWeight = "normal";
            }
        }
    } else {
        x1.style.display = "none";
        x2.style.color = "black";
//        x2.style.fontWeight = "normal";
    }
}

function yrForm() {
    var checkBox = document.getElementById("yrCheck");
    var inputYr = document.getElementById("yrValue");
    if (checkBox.checked == true){
        inputYr.style.opacity = 1;
    }
    else{
        inputYr.style.opacity = 0;
    }
}

function tableToCSV() {
 
    // Variable to store the final csv data
    var csv_data = [];
 
    // Get each row data from myTable
    var table = document.getElementById("myTable");
    
    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
 
        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');
 
        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {
 
            // Get the text data of each cell of
            // a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }
 
        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }
    // combine each row data with new line character
    csv_data = csv_data.join('\n');
 
    // Download the data in a csv file
    downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data) {
 
    // Create CSV file object and feed our
    // csv_data into it
    CSVFile = new Blob([csv_data], { type: "text/csv" });
 
    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');
 
    // Download csv file
    temp_link.download = "HUNTDB_custom.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
 
    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
 
    // Automatically click the link to trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}

function displayform() {
    var x1 = document.getElementById("formsource");
    if (x1.style.display === "none") {
        x1.style.display = "block";
    } else {
        x1.style.display = "none";
    }
}
