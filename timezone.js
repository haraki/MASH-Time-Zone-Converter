var timezoneData;

function makeTimeZoneOption(tzData)
{
	timezoneData = tzData;
	
	var src = $("#src_zone");
	var dst = $("#dst_zone");
	
	for(var i = 0;i < tzData.length;i++)
	{
		src.append("<option value = \"" + tzData[i].name + "\">" + tzData[i].name + "</option>");
		dst.append("<option value = \"" + tzData[i].name + "\">" + tzData[i].name + "</option>");
	}
	
	src.selectmenu('refresh');
	dst.selectmenu('refresh');
}

function translateTimeZone()
{
	var srcZone    = $("#src_zone").val();
	var dstZone    = $("#dst_zone").val();
	var srcDateVal = $("#src_date").val();
	var srcTimeVal = $("#src_time").val();
	
	if((srcZone == "") || (dstZone == "") || (srcDateVal == "") || (srcTimeVal == ""))
	{
		return;
	}
	
	var srcDate = $("#src_date").datebox('getTheDate');
	var srcTime = $("#src_time").datebox('getTheDate');
	
	var src = new timezoneJS.Date(srcDate.getFullYear(), srcDate.getMonth(), srcDate.getDate(), srcTime.getHours(), srcTime.getMinutes(), srcZone);
	
	var dst = new timezoneJS.Date(src);
	dst.setTimezone(dstZone);
	
	var dstDate = new Date(dst.getTime() + (src.getTimezoneOffset() - dst.getTimezoneOffset()) * 60 * 1000);
	
	$("#dst_date").datebox('setTheDate', dstDate);
	$("#dst_date").trigger('datebox', {'method' : 'doset'});
	$("#dst_time").datebox('setTheDate', dstDate);
	$("#dst_time").trigger('datebox', {'method' : 'doset'});
	
	$("#dst_date_text").text($("#dst_date").val());
	$("#dst_time_text").text($("#dst_time").val());
}

function initialize()
{
	timezoneJS.timezone.zoneFileBasePath = './tz';
	timezoneJS.timezone.init();
	
	$.getJSON('./timezone.json', makeTimeZoneOption);
}

$(document).ready(initialize);
