window.JST = window.JST || {};
var template = function(str){var fn = new Function('obj', 'var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(\''+str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/<%=([\s\S]+?)%>/g,function(match,code){return "',"+code.replace(/\\'/g, "'")+",'";}).replace(/<%([\s\S]+?)%>/g,function(match,code){return "');"+code.replace(/\\'/g, "'").replace(/[\r\n\t]/g,' ')+"__p.push('";}).replace(/\r/g,'\\r').replace(/\n/g,'\\n').replace(/\t/g,'\\t')+"');}return __p.join('');");return fn;};
window.JST['query'] = template('<p ng-if="search_error">\n  <span class="label label-danger">Search Error</span>\n  {{ search_error }}\n</p>\n\n<p ng-if="completed && success && !last_model">\n  <em>No matching data</em>\n</p>\n\n<div ng-if="completed && success && last_model">\n\n<p ng-if="computed_since">\n  Results from {{ computed_on }}, {{ computed_since }} - use "Refresh" to get latest results\n</p>\n<p ng-if="table.partial_fetch !== undefined">\n  Too many objects, fetching first {{ table.partial_fetch }}. Click\n  <a href="javascript:void(0);" ng-click="table.fetchAll()">here</a>\n  to fetch all objects. May be slow.\n</p>\n\n<div id="results-header">\n  <div ng-if="!csv">\n    <span class="page-summary">\n      {{ table.view.current_page*table.view.page_size+1 }}-{{ table.view.current_page*table.view.page_size+table.view.getCurrentItems().length }}/{{ table.length }}\n      row(s) of <b>{{ last_model }}</b>\n    </span>\n    <span>\n      <a href="javascript:void(0);"\n         ng-click="table.prevPage()"\n         ng-if="table.view.current_page > 0">Prev</a>\n      &nbsp;\n      <a href="javascript:void(0);"\n         ng-click="table.nextPage()"\n         ng-if="table.view.current_page*table.view.page_size+table.view.page_size < table.length">Next</a>\n      &nbsp;\n      <a href="javascript:void(0)" ng-click="toggleCSV()">CSV</a>\n      <a href="javascript:void(0)"\n       ng-click="table.createTable(true)" ng-if="table.left_join_mode === false">With Partial Rows</a>\n      <a href="javascript:void(0)"\n       ng-click="table.createTable(false)" ng-if="table.left_join_mode === true">Full Rows Only</a>\n    </span>\n  </div>\n  <div ng-if="csv">\n    <a href="javascript:void(0)" ng-click="toggleCSV()">Table</a>\n  </div>\n\n  <div class="navbar-right">\n    <div class="dropdown">\n      <a data-toggle="dropdown" href="javascript:void(0);">Help</a>\n      <div class="dropdown-menu panel panel-default pull-right help">\n        <div class="panel-body">\n          Click on column header to sort. Click on\n          <span class="glyphicon glyphicon-search"></span>\n          to dynamically create a filter for the column, and then click on\n          <span class="glyphicon glyphicon-search"></span> again\n          to use filter. Click on\n          <span class="glyphicon glyphicon-stats"></span>\n          to see aggregate counts of values in the column, after applying\n          filters from all the columns.\n        </div>\n      </div>\n    </div>\n\n    <div>\n      <a href="javascript:void(0);" ng-click="table.clearSort()">Reset Sort</a>\n    </div>\n\n    <div id="recommended_rels" class="dropdown">\n      <a data-toggle="dropdown" href="javascript:void(0);">Relations from {{ last_model }}</a>\n      <ul class="rel-list dropdown-menu" role="menu">\n        <li ng-repeat="rel in last_model_rels">\n          <span class="rel-actions">\n            <a class="btn btn-xs btn-info" href=\'javascript:void(0);\' title="Extend query"\n               ng-click="extendQuery(last_model, rel)">Q</a>\n          </span>\n          <span class="rel-name">{{ rel }}</span>\n        </li>\n      </ul>\n    </div> <!-- recommended_rels -->\n\n  </div> <!-- navbar-right -->\n</div>\n\n<table class="table table-condensed table-striped table-bordered table-fixed" ng-if="table.attrs && !csv">\n  <tr class="success">\n    <td class="id"></td>\n    <td class="wrap" ng-repeat="q in table.queries track by $index" colspan="{{ q.cols }}">\n      <a href="javascript:void(0)" ng-click="table.toggleQuery($index)" title="Click to show/hide attrs"\n       >{{ q.model }}</a>\n    </td>\n  </tr>\n\n  <tr class="success">\n    <th class="id"></th>\n    <th ng-repeat="attr in table.attrs track by $index" ng-if="attr.visible">\n      <a href="javascript:void(0);" ng-click="table.sort($index)"\n         ng-if="table.controls.sort_columns.indexOf($index) < 0">{{ attr.name }}</a>\n\n      <span ng-if="table.controls.sort_columns.indexOf($index) >= 0">\n        {{ attr.name }}\n        <a href="javascript:void(0);" ng-click="table.sort($index)"\n         ><span class="glyphicon glyphicon-chevron-up"\n                ng-if="table.controls.sort_dirs[table.controls.sort_columns.indexOf($index)]"\n         ></span\n         ><span class="glyphicon glyphicon-chevron-down"\n                ng-if="!table.controls.sort_dirs[table.controls.sort_columns.indexOf($index)]"\n         ></span></a>\n        ({{ table.controls.sort_columns.indexOf($index)+1 }})\n      </span>\n\n      <span ng-if="table.controls.filters[$index]" ng-init="columnIndex=$index">\n        <span ng-if="table.controls.filtered[$index] !== undefined">\n          <span ng-if="table.controls.filtered[$index] !== \'\'">\n            ({{ table.controls.filtered[$index] }})\n          </span>\n          <span ng-if="table.controls.filtered[$index] === \'\'">\n            (<em>empty</em>)\n          </span>\n        </span>\n        <span class="dropdown">\n          <span class="dropdown-toggle" data-toggle="dropdown">\n            <a href="javascript:void(0);"><span class="glyphicon glyphicon-search"></span></a>\n          </span>\n          <ul class="dropdown-menu" role="menu">\n            <li><a href="javascript:void(0);" ng-click="table.filter(columnIndex)"\n                 ><em>All</em></a></li>\n            <li ng-repeat="value in table.controls.filters[$index]">\n              <a href="javascript:void(0);" ng-click="table.filter(columnIndex, value)"\n               ><span ng-if="value === \'\'"\n                 >&nbsp;</span><span ng-if="value">{{ value }}</span></a></li>\n          </ul>\n        </span>\n      </span>\n\n      <span ng-if="!table.controls.filters[$index]" class="dropdown">\n        <a href="javascript:void(0);" ng-click="table.makeFilter($index)"\n           data-toggle="dropdown"\n         ><span class="glyphicon glyphicon-search"></span></a>\n        <div class="dropdown-menu panel panel-default">\n          <div class="panel-body">\n            <p ng-if="table.partial_fetch !== undefined">\n              Filter option only available when all objects have been fetched.\n            </p>\n            <p ng-if="table.partial_fetch === undefined">\n              Loading data and building filter. Click on icon again to use filter ...\n            </p>\n          </div>\n        </div>\n      </span>\n\n      <span ng-if="table.controls.filters[$index]" class="dropdown">\n        <a href="javascript:void(0);" ng-click="table.aggregate($index)"\n           data-toggle="dropdown"\n         ><span class="glyphicon glyphicon-stats"></span></a>\n        <ul class="dropdown-menu stats-list" role="menu">\n          <li> <b>Aggregates based on all filters</b> </li>\n          <li ng-repeat="(v, counts) in table.controls.aggregates[$index]">\n            <span ng-if="v === \'\'"><em>Empty</em>:</span>\n            <span ng-if="v !== \'\'">{{ v }}:</span>\n            {{ counts }}\n          </li>\n        </ul>\n      </span>\n\n    </th>\n  </tr>\n\n  <tr ng-repeat="row in table.view.getCurrentItems() track by $index">\n    <td class="id">{{ row.i+1 }}</td>\n    <td class="wrap" ng-repeat="object in row.row track by $index" ng-if="table.attrs[$index].visible">\n      <span ng-bind-html="object.ptr[table.attrs[$index].name]|showAttr"></span>\n    </td>\n  </tr>\n</table>\n\n<textarea class="csv" ng-if="csv" readonly>{{ table.csv }}</textarea>\n\n</div> <!-- if for results table -->\n');
window.JST['search'] = template('<div class="container-fluid">\n\n<p>\n  <a href="#/" class="lead">Curious</a>\n</p>\n\n<div class="well">\n  <div class="row">\n  <form>\n    <div class="col-md-10">\n      <textarea id="query" class="form-control" placeholder=\'Enter query\'\n       ng-model="query" ng-change="delayCheckQuery()" /></textarea>\n    </div>\n    <button type="submit" class="btn btn-primary" ng-click="submitQuery()">Search</button>\n    <button type="submit" class="btn btn-warning" ng-click="submitQuery(true)">Refresh</button>\n  </form>\n  </div>\n</div>\n\n<p ng-if="query_error">\n  <span class="label label-danger">Query Syntax Error</span>\n  <code>{{ query_error }}</code\n</p>\n\n<p ng-if="query_accepted">\n  <span class="label label-info">Valid Query</span>\n  <code>{{ query_accepted }}</code>\n</p>\n\n<div id="results">\n  <div ng-repeat="query_info in query_submitted">\n    <partial template="query" ng-controller="QueryController"></partial>\n  </div>\n</div>\n\n<div id="queries">\n  <p><h4>Recent Queries</h4></p>\n  <div ng-repeat="query in recent_queries">\n    <a href="#/q/{{ query|encodeURI }}">{{ query }}</a>\n  </div>\n</div>\n\n</div> <!-- container-fluid -->\n');
