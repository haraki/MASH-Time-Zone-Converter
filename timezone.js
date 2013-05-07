var timezoneData;

function initializeOption(tzData)
{
	timezoneData = tzData;
	
	var src = $("#src_country");
	var dst = $("#dst_country");
	
	var oldCountry = "";
	
	for(var i = 0;i < timezoneData.length;i++)
	{
		if(timezoneData[i].country != oldCountry)
		{
			var option_str = "<option value = \"" + timezoneData[i].country + "\">" + timezoneData[i].country + "</option>";
		
			src.append(option_str);
			dst.append(option_str);
			
			oldCountry = timezoneData[i].country;
		}
	}
	
	src.selectmenu('refresh', true);
	dst.selectmenu('refresh', true);
}

function clearCitySelect(cityId)
{
	var len = $(cityId).children().length;
	for(var i = 1;i < len;i++)
	{
		$(cityId).children('option:last-child').remove();
	}
}

function appendCitySelect(cityId, country)
{
	var firstValue = "";
	
	for(var i = 0;i < timezoneData.length;i++)
	{
		if(timezoneData[i].country == country)
		{
			var option_str = "<option value = \"" + timezoneData[i].tz + "\">" + timezoneData[i].city + "</option>";
			
			$(cityId).append(option_str);
			
			if(firstValue == "")
			{
				firstValue = timezoneData[i].tz;
			}
		}
	}
	
	$(cityId).val(firstValue);
}

function translateTimeZone()
{
	var srcZone    = $("#src_city").val();
	var dstZone    = $("#dst_city").val();
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

function change_srcCountry()
{
	var srcCountry = $("#src_country").val();
	
	clearCitySelect('#src_city');
	
	if(srcCountry == "")
	{
		$("#src_city").selectmenu('disable');
	}
	else
	{
		appendCitySelect('#src_city', srcCountry);
		
		$("#src_city").selectmenu('enable');
	}
	
	$("#src_city").selectmenu('refresh', true);
}

function change_dstCountry()
{
	var dstCountry = $("#dst_country").val();
	
	clearCitySelect('#dst_city');
	
	if(dstCountry == "")
	{
		$("#dst_city").selectmenu('disable');
	}
	else
	{
		appendCitySelect('#dst_city', dstCountry);
		
		$("#dst_city").selectmenu('enable');
	}
	
	$("#dst_city").selectmenu('refresh', true);
}

function change_srcCity()
{
	translateTimeZone();
}

function change_dstCity()
{
	translateTimeZone();
}

function change_srcDate()
{
	translateTimeZone();
}

function change_srcTime()
{
	translateTimeZone();
}

function initialize()
{
	timezoneJS.timezone.zoneFileBasePath = './tz';
	timezoneJS.timezone.init();
	
	$.getJSON('./timezone.json', initializeOption);
}

$(document).ready(initialize);
