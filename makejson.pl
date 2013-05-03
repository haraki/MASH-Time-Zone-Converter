#!/usr/bin/perl

my $zone_tab_file = "tz/zone.tab";
my $json_file = "timezone.json";

if(!open(IN_FILE, $zone_tab_file))
{
	print $zone_tab_file . " open error.\n";
	exit(-1);
}

my @zone_tab_list = <IN_FILE>;

close(IN_FILE);

my @zone_list;
foreach my $zone_tab_str (@zone_tab_list)
{
	if($zone_tab_str !~ /#/)
	{
		chomp($zone_tab_str);
		my @zone_tab = split(/\t/, $zone_tab_str);
		push(@zone_list, $zone_tab[2]);
	}
}

if(!open(OUT_FILE, ">$json_file"))
{
	print $json_file . " open error.\n";
	exit(-1);
}

my $first = 1;
print OUT_FILE "[\n";
foreach my $zone (@zone_list)
{
	if(!$first)
	{
		print OUT_FILE ",\n";
	}
	$first = 0;
	print OUT_FILE "\t{ \"name\":\"$zone\" }";
}
print OUT_FILE "\n]\n";

close(OUT_FILE);
