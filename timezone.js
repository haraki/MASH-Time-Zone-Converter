var timezoneData;
var language = "en";

function initialize()
{
	$.getJSON(JSON_FILE, initialize2);
}

function initialize2(tzData)
{
	timezoneData = tzData;
	
	timezoneJS.timezone.zoneFileBasePath = './tz';
	timezoneJS.timezone.init({ async: false });
	
	var oldCountry = "";
	for(var i = 0;i < timezoneData.length;i++)
	{
		if(timezoneData[i].country != oldCountry)
		{
			var option_str = "<option value = \"" + timezoneData[i].country + "\">" + timezoneData[i].country + "</option>";
		
			$("#src_country").append(option_str);
			$("#dst_country").append(option_str);
			
			oldCountry = timezoneData[i].country;
		}
	}
	
	checkCookie('src_country', "#src_country", 'src_zone', '#src_city');
	checkCookie('dst_country', "#dst_country", 'dst_zone', '#dst_city');
	
	$("#src_country").selectmenu('refresh', true);
	$("#dst_country").selectmenu('refresh', true);
	$("#src_city").selectmenu('refresh', true);
	$("#dst_city").selectmenu('refresh', true);
	
	var srcZone = $("#src_city").val();
	if((srcZone != undefined) && (srcZone != ""))
	{
		var tzDate = new timezoneJS.Date();
		tzDate.setTimezone(srcZone);
		
		var srcDate = new Date(tzDate.getFullYear(), tzDate.getMonth(), tzDate.getDate(), tzDate.getHours(), tzDate.getMinutes(), 0, 0);
		
		$("#src_date").datebox('setTheDate', srcDate);
		$("#src_date").trigger('datebox', {'method' : 'doset'});
		$("#src_time").datebox('setTheDate', srcDate);
		$("#src_time").trigger('datebox', {'method' : 'doset'});
	}
	
	translateTimeZone();
	
	$("#initialize").hide();
	$("#main").show();
}

function checkCookie(countryCookieName, countrySelectId, zoneCookieName, citySelectId)
{
	var countryCookie = $.cookie(countryCookieName);
	if((countryCookie != undefined) && (countryCookie != ""))
	{
		$(countrySelectId).val(countryCookie);
		
		var firstValue = setCitySelect(citySelectId, countryCookie);
		
		var zoneCookie = $.cookie(zoneCookieName);
		if((zoneCookie != undefined) && (zoneCookie != ""))
		{
			$(citySelectId).selectmenu('enable');
			
			$(citySelectId).val(zoneCookie);
		}
		else if((firstValue != undefined) && (firstValue != ""))
		{
			$(citySelectId).selectmenu('enable');
			
			$(citySelectId).val(firstValue);
		}
	}
}

function clearCitySelect(cityId)
{
	var len = $(cityId).children().length;
	for(var i = 1;i < len;i++)
	{
		$(cityId).children('option:last-child').remove();
	}
}

function setCitySelect(cityId, country)
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
	
	return firstValue;
}

function translateTimeZone()
{
	var srcZone    = $("#src_city").val();
	var dstZone    = $("#dst_city").val();
	var srcDateVal = $("#src_date").val();
	var srcTimeVal = $("#src_time").val();
	
	if((srcZone == undefined) || (srcZone == "") || (dstZone == undefined) || (dstZone == "") ||
	   (srcDateVal == undefined) || (srcDateVal == "") || (srcTimeVal == undefined) || (srcTimeVal == ""))
	{
		return;
	}
	
	var srcDate = $("#src_date").datebox('getTheDate');
	var srcTime = $("#src_time").datebox('getTheDate');
	
	var tzDate = new timezoneJS.Date(srcDate.getFullYear(), srcDate.getMonth(), srcDate.getDate(), srcTime.getHours(), srcTime.getMinutes(), 0, 0, srcZone);
	tzDate.setTimezone(dstZone);
	
	var dstDate = new Date(tzDate.getFullYear(), tzDate.getMonth(), tzDate.getDate(), tzDate.getHours(), tzDate.getMinutes(), 0, 0);
	
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
	
	$.cookie('src_country', srcCountry);
	
	clearCitySelect('#src_city');
	
	if(srcCountry == "")
	{
		$("#src_city").selectmenu('disable');
	}
	else
	{
		var firstValue = setCitySelect('#src_city', srcCountry);
		
		$('#src_city').val(firstValue);
		
		$.cookie('src_zone', firstValue);
		
		$("#src_city").selectmenu('enable');
	}
	
	$("#src_city").selectmenu('refresh', true);
	
	translateTimeZone();
}

function change_dstCountry()
{
	var dstCountry = $("#dst_country").val();
	
	$.cookie('dst_country', dstCountry);
	
	clearCitySelect('#dst_city');
	
	if(dstCountry == "")
	{
		$("#dst_city").selectmenu('disable');
	}
	else
	{
		var firstValue = setCitySelect('#dst_city', dstCountry);
		
		$('#dst_city').val(firstValue);
		
		$.cookie('dst_zone', firstValue);
		
		$("#dst_city").selectmenu('enable');
	}
	
	$("#dst_city").selectmenu('refresh', true);
	
	translateTimeZone();
}

function change_srcCity()
{
	var srcZone = $("#src_city").val();
	
	$.cookie('src_zone', srcZone);
	
	translateTimeZone();
}

function change_dstCity()
{
	var dstZone = $("#dst_city").val();
	
	$.cookie('dst_zone', dstZone);
	
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

function click_optionOk()
{
	var lang = $("#language").val();
	if(lang != language)
	{
		$.cookie('language', lang);
	
		location.replace("./");
	}
}

function startInitialize()
{
	var languageCookie = $.cookie("language");
	if((languageCookie != undefined) && (languageCookie != ""))
	{
		language = languageCookie;
	}
	
	$.i18n.properties({name:'Messages', path:'./i18n/', mode:'both', language:language, callback:initialize});
}

$(document).ready(startInitialize);
