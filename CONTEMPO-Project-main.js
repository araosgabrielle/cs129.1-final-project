map = function() {
	return this.north_avenue_entrance
}

reduce = function(key,traffic) {
	var nae = 0;
	for var i = 0; i < traffic.length; i++){
		nae += traffic[i];
	}
	return {north_ave_entrance: nae};
}

results = db.runCommand ({
	mapReduce: 'test',
	map: map,
	reduce: reduce,
	out: 'test.report'
})

db.test.aggregate(
{$group:
{_id:"$month",
naentry:{$sum:"$north_avenue_entry"},
naexit:{$sum:"$north_avenue_exit"},
}},{$sort:{northaveentry:-1}})

--total entry and exit for each station per month

db.test.aggregate(
{$group:
	{_id:"$month",
	naentry:{$sum:"$north_avenue_entry"},
	naexit:{$sum:"$north_avenue_exit"},
	qaentry:{$sum:"$quezon_avenue_entry"},
	qaexit:{$sum:"$quezon_avenue_exit"},
	gkentry:{$sum:"$gma_kamuning_entry"},
	gkexit:{$sum:"$gma_kamuning_exit"},
	cuentry:{$sum:"$cubao_entry"},
	cuexit:{$sum:"$cubao_exit"},
	stentry:{$sum:"$santolan_entry"},
	stexit:{$sum:"$santolan_exit"},
	orentry:{$sum:"$ortigas_entry"},
	orexit:{$sum:"$ortigas_exit"},
	sbentry:{$sum:"$shaw_blvd_entry"},
	sbexit:{$sum:"$shaw_blvd_exit"},
	baentry:{$sum:"$boni_avenue_entry"},
	baexit:{$sum:"$boni_avenue_exit"},
	guentry:{$sum:"$guadalupe_entry"},
	guexit:{$sum:"$guadalupe_exit"},
	buentry:{$sum:"$buendia_entry"},
	buexit:{$sum:"$buendia_exit"},
	ayentry:{$sum:"$ayala_avenue_entry"},
	ayexit:{$sum:"$ayala_avenue_exit"},
	mgentry:{$sum:"$magallanes_entry"},
	mgexit:{$sum:"$magallanes_exit"},
	tfentry:{$sum:"$taft_entry"},
	tfexit:{$sum:"$taft_exit"}
	}
})

--total riders of each station per month

db.test.aggregate(
{
	$group:
	{
	_id:"$month",
	naentry:{$sum:"$north_avenue_entry"},
	naexit:{$sum:"$north_avenue_exit"},
	qaentry:{$sum:"$quezon_avenue_entry"},
	qaexit:{$sum:"$quezon_avenue_exit"},
	gkentry:{$sum:"$gma_kamuning_entry"},
	gkexit:{$sum:"$gma_kamuning_exit"},
	cuentry:{$sum:"$cubao_entry"},
	cuexit:{$sum:"$cubao_exit"},
	stentry:{$sum:"$santolan_entry"},
	stexit:{$sum:"$santolan_exit"},
	orentry:{$sum:"$ortigas_entry"},
	orexit:{$sum:"$ortigas_exit"},
	sbentry:{$sum:"$shaw_blvd_entry"},
	sbexit:{$sum:"$shaw_blvd_exit"},
	baentry:{$sum:"$boni_avenue_entry"},
	baexit:{$sum:"$boni_avenue_exit"},
	guentry:{$sum:"$guadalupe_entry"},
	guexit:{$sum:"$guadalupe_exit"},
	buentry:{$sum:"$buendia_entry"},
	buexit:{$sum:"$buendia_exit"},
	ayentry:{$sum:"$ayala_avenue_entry"},
	ayexit:{$sum:"$ayala_avenue_exit"},
	mgentry:{$sum:"$magallanes_entry"},
	mgexit:{$sum:"$magallanes_exit"},
	tfentry:{$sum:"$taft_entry"},
	tfexit:{$sum:"$taft_exit"}
	}
},
{
	$project:
	{
	natraffic:{$sum:["$naentry","$naexit"]},
	qatraffic:{$sum:["$qaentry","$qaexit"]},
	gktraffic:{$sum:["$gkentry","$gkexit"]},
	cutraffic:{$sum:["$cuentry","$cuexit"]},
	sttraffic:{$sum:["$stentry","$stexit"]},
	ortraffic:{$sum:["$orentry","$orexit"]},
	sbtraffic:{$sum:["$sbentry","$sbexit"]},
	batraffic:{$sum:["$baentry","$baexit"]},
	gutraffic:{$sum:["$guentry","$guexit"]},
	butraffic:{$sum:["$buentry","$buexit"]},
	aytraffic:{$sum:["$ayentry","$ayexit"]},
	mgtraffic:{$sum:["$mgentry","$mgexit"]},
	tftraffic:{$sum:["$tfentry","$tfexit"]}
	}
}
)

--total traffic per month, sorted descending

db.test.aggregate(
{
	$group:
	{
	_id:"$month",
	naentry:{$sum:"$north_avenue_entry"},
	naexit:{$sum:"$north_avenue_exit"},
	qaentry:{$sum:"$quezon_avenue_entry"},
	qaexit:{$sum:"$quezon_avenue_exit"},
	gkentry:{$sum:"$gma_kamuning_entry"},
	gkexit:{$sum:"$gma_kamuning_exit"},
	cuentry:{$sum:"$cubao_entry"},
	cuexit:{$sum:"$cubao_exit"},
	stentry:{$sum:"$santolan_entry"},
	stexit:{$sum:"$santolan_exit"},
	orentry:{$sum:"$ortigas_entry"},
	orexit:{$sum:"$ortigas_exit"},
	sbentry:{$sum:"$shaw_blvd_entry"},
	sbexit:{$sum:"$shaw_blvd_exit"},
	baentry:{$sum:"$boni_avenue_entry"},
	baexit:{$sum:"$boni_avenue_exit"},
	guentry:{$sum:"$guadalupe_entry"},
	guexit:{$sum:"$guadalupe_exit"},
	buentry:{$sum:"$buendia_entry"},
	buexit:{$sum:"$buendia_exit"},
	ayentry:{$sum:"$ayala_avenue_entry"},
	ayexit:{$sum:"$ayala_avenue_exit"},
	mgentry:{$sum:"$magallanes_entry"},
	mgexit:{$sum:"$magallanes_exit"},
	tfentry:{$sum:"$taft_entry"},
	tfexit:{$sum:"$taft_exit"}
	}
},
{
	$project:
	{
	traffic:{$sum:["$naentry","$naexit","$qaentry","$qaexit","$gkentry","$gkexit","$cuentry","$cuexit","$stentry","$stexit","$orentry","$orexit","$sbentry","$sbexit","$baentry","$baexit","$guentry","$guexit","$buentry","$buexit","$ayentry","$ayexit","$mgentry","$mgexit","$tfentry","$tfexit"]}
	}
},
{
	$sort:
	{
	traffic:-1
	}
}
)





--- what time of the day does the MRT Line 3 stations experience the most traffic
-- sorted descending:


db.test.aggregate(
{
	$group:
	{
	_id:"$time",
	naentry:{$sum:"$north_avenue_entry"},
	naexit:{$sum:"$north_avenue_exit"},
	qaentry:{$sum:"$quezon_avenue_entry"},
	qaexit:{$sum:"$quezon_avenue_exit"},
	gkentry:{$sum:"$gma_kamuning_entry"},
	gkexit:{$sum:"$gma_kamuning_exit"},
	cuentry:{$sum:"$cubao_entry"},
	cuexit:{$sum:"$cubao_exit"},
	stentry:{$sum:"$santolan_entry"},
	stexit:{$sum:"$santolan_exit"},
	orentry:{$sum:"$ortigas_entry"},
	orexit:{$sum:"$ortigas_exit"},
	sbentry:{$sum:"$shaw_blvd_entry"},
	sbexit:{$sum:"$shaw_blvd_exit"},
	baentry:{$sum:"$boni_avenue_entry"},
	baexit:{$sum:"$boni_avenue_exit"},
	guentry:{$sum:"$guadalupe_entry"},
	guexit:{$sum:"$guadalupe_exit"},
	buentry:{$sum:"$buendia_entry"},
	buexit:{$sum:"$buendia_exit"},
	ayentry:{$sum:"$ayala_avenue_entry"},
	ayexit:{$sum:"$ayala_avenue_exit"},
	mgentry:{$sum:"$magallanes_entry"},
	mgexit:{$sum:"$magallanes_exit"},
	tfentry:{$sum:"$taft_entry"},
	tfexit:{$sum:"$taft_exit"}
	}
},
{
	$project:
	{
	traffic:{$sum:["$naentry","$naexit","$qaentry","$qaexit","$gkentry","$gkexit","$cuentry","$cuexit","$stentry","$stexit","$orentry","$orexit","$sbentry","$sbexit","$baentry","$baexit","$guentry","$guexit","$buentry","$buexit","$ayentry","$ayexit","$mgentry","$mgexit","$tfentry","$tfexit"]}
	}
},
{
	$sort:
	{
	traffic:-1
	}
}
)