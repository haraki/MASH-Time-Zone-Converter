var timezoneData;

function makeTimeZoneOption(tzData)
{
	timezoneData = tzData;
	
	var src = $("#src_zone");
	var dst = $("#dst_zone");
	
	for(var i = 0;i < tzData.length;i++)
	{
		var optionValue  = tzData[i].name;
		var optionString = tzData[i].name + "(UTC" + tzData[i].diff + ")";
		
		src.append("<option value = \"" + optionValue + "\">" + optionString + "</option>");
		dst.append("<option value = \"" + optionValue + "\">" + optionString + "</option>");
	}
	
	src.selectmenu('refresh');
	dst.selectmenu('refresh');
}

function getDiff(name)
{
	for(var i = 0;i < timezoneData.length;i++)
	{
		if(timezoneData[i].name == name)
		{
			return parseFloat(timezoneData[i].diff);
		}
	}
	
	return null;
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
	
	var srcDiff = getDiff(srcZone);
	var dstDiff = getDiff(dstZone);
	
	if((srcDiff == null) || (dstDiff == null))
	{
		return;
	}
	
	var srcDate = $("#src_date").datebox('getTheDate');
	var srcTime = $("#src_time").datebox('getTheDate');
	
	var src = new Date(srcDate.getFullYear(), srcDate.getMonth(), srcDate.getDate(), srcTime.getHours(), srcTime.getMinutes(), 0, 0);
	var dst = new Date(src.getTime() + ((dstDiff - srcDiff) * 60 * 60 * 1000));
	
	$("#dst_date").datebox('setTheDate', dst);
	$("#dst_date").trigger('datebox', {'method' : 'doset'});
	$("#dst_time").datebox('setTheDate', dst);
	$("#dst_time").trigger('datebox', {'method' : 'doset'});
}

function initialize()
{
	$.getJSON('./timezone.json', makeTimeZoneOption);
}

$(document).ready(initialize);
