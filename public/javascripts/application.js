$(document).ready(function () {
  $('#city_search').autocomplete("/search", {
    dataType: "json",
    parse: function(data) {
      return $.map(data, function(row) {
        return {
          data: row,
          value: row.name,
          result: row.name
        }
      });
    },
    formatItem: function(item) {
      return "<a href='"+item.url+"'><span>"+item.name+"</span></a>"
    },
    minChars: 2,
    resultsClass: "suggestedOptions",
    width: "23em",
    scroll: false,
    selectFirst: false
  }).result(function(e,item){
    location.href = item.url;
  });

  $('#city_compare_search').autocomplete("/search", {
    dataType: "json",
    parse: function(data) {
      return $.map(data, function(row) {
        return {
          data: row,
          value: row.name,
          result: row.name
        }
      });
    },
    formatItem: function(item) {
      return "<a href='"+item.url+"'><span>"+item.name+"</span></a>"
    },
    minChars: 2,
    resultsClass: "suggestedOptions",
    width: "23em",
    scroll: false,
    selectFirst: false
  }).result(function(e,item){
    location.href = item.url;
  });
  
  if ($('#holder').length != 0) {single_graph()}
  if ($('#holder_a').length != 0 || $('#holder_b').length != 0) {compare_graph()}
});

var income_txts = ["IMPUESTOS Y TASAS","OTRAS ADMINISTRACIONES","PATRIMONIO","ACTIVOS FINANCIEROS","PRÉSTAMOS"];
var income_txts_short  = ["IMPUESTOS Y TASAS","OTRAS ADMONS.","PATRIMONIO","ACT. FINANCIEROS","PRÉSTAMOS"];
var expense_txts = ["PERSONAL","GASTOS COTIDIANOS","PROYECTOS E INVERSIONES","SUBVENCIONES","OTRAS ENTIDADES","ACTIVOS FINANCIEROS","PRÉSTAMOS"];

function single_graph() {
  var paper = Raphael("holder", 660, 530);
  
  var vi = ingresos;
  var despl = 0;
  for (var i=0; i < vi.length; i++) {
    despl = despl + 260*vi[i]/100
    paper.presus.start_block(0,i*100+i*5,200,100,vi[i],income_txts[i],despl,305,24);
  };
  
  var vg = gastos;
  var despl = 0;
  for (var i=0; i < vg.length; i++) {
    despl = despl + 260*vg[i]/100
    paper.presus.end_block(0,i*70+i*5,200,70,vg[i],expense_txts[i],despl,335,459);
  };
  paper.safari();
};

function compare_graph() {
  var divs  = ["holder_a","holder_b"];
  var ingrs = [ingresos,ingresos2];
  var gasts = [gastos,gastos2];
  
  for (var x=0; x < divs.length; x++) {
    var paper = Raphael(divs[x], 460, 530);

    var vi = ingrs[x];
    var despl = 0;
    for (var i=0; i < vi.length; i++) {
      despl = despl + 260*vi[i]/100
      paper.presus.start_block(0,i*100+i*5,130,100,vi[i],income_txts_short[i],despl,205,20);
    };

    var vg = gasts[x];
    var despl = 0;
    for (var i=0; i < vg.length; i++) {
      despl = despl + 260*vg[i]/100
      paper.presus.end_block(0,i*70+i*5,130,70,vg[i],expense_txts[i],despl,235,330);
    };
    paper.safari();
  };
};

function format_num(num){
  num += '';
  x = num.split(',');
  x1 = x[0];
  x2 = x.length > 1 ? ',' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}