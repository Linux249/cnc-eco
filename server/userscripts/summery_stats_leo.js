// ==UserScript==
// @name           Tiberium Alliances Report Stats
// @version        0.5.3.1
// @namespace     http://cnc-eco.herokuapp.com
// @homepage      http://cnc-eco.herokuapp.com
// @include       http*://*.alliances.commandandconquer.com/*/index.aspx*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author         petui
// @contributor    leo7044 (https://github.com/leo7044)
// @downloadURL    https://raw.githubusercontent.com/leo7044/CnC_TA/master/Tiberium_Alliances_Report_Stats_sumPerCp.user.js
// @updateURL      https://raw.githubusercontent.com/leo7044/CnC_TA/master/Tiberium_Alliances_Report_Stats_sumPerCp.user.js
// @description    Calculates combined RT and CP costs and loot of multiple combat reports
// @include        http*://cncapp*.alliances.commandandconquer.com/*/index.aspx*
// @include        http*://*.alliances.commandandconquer.com/*/index.aspx*
// @grant          GM_log
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// @grant          GM_updatingEnabled
// @grant          unsafeWindow
// ==/UserScript==
'use strict';

(function() {
    var main = function() {
        'use strict';

        function createReportStats() {
            console.log('ReportStats loaded');

            qx.Class.define('ReportStats', {
                type: 'singleton',
                extend: qx.core.Object,
                statics: {
                    BaseInfoExtraWidth: 6, // width to add to BaseInfoWindow to get rid of horizontal scroll bar
                    StatusbarHeight: 35, // height to add to BaseInfoWindow to accomodate statusbar being visible
                    CheckboxColumnWidth: 28,
                    ResourceTypes: {},
                },
                defer: function(statics) {
                    var fileManager = ClientLib.File.FileManager.GetInstance();
                    statics.ResourceTypes[
                        ClientLib.Base.EResourceType.Tiberium
                    ] = fileManager.GetPhysicalPath('ui/common/icn_res_tiberium.png');
                    statics.ResourceTypes[
                        ClientLib.Base.EResourceType.Crystal
                    ] = fileManager.GetPhysicalPath('ui/common/icn_res_chrystal.png');
                    statics.ResourceTypes[
                        ClientLib.Base.EResourceType.Gold
                    ] = fileManager.GetPhysicalPath('ui/common/icn_res_dollar.png');
                    statics.ResourceTypes[
                        ClientLib.Base.EResourceType.Power
                    ] = fileManager.GetPhysicalPath('ui/common/icn_res_power.png');
                    statics.ResourceTypes[
                        ClientLib.Base.EResourceType.ResearchPoints
                    ] = fileManager.GetPhysicalPath('ui/common/icn_res_research.png');
                },
                members: {
                    reportsLoading: [],
                    reportsLoaded: [],
                    skipBaseInfoReportsReload: 0,

                    initialize: function() {
                        this.initializeHacks();
                        this.initializeUserInterface();
                    },

                    initializeHacks: function() {
                        var source;

                        if (typeof qx.ui.table.model.Abstract.prototype.addColumn !== 'function') {
                            source = qx.ui.table.model.Abstract.prototype.getColumnId.toString();
                            var columnIdsMemberName = source.match(
                                /return this\.([A-Za-z_]+)\[[A-Z]\];/
                            )[1];
                            source = qx.ui.table.model.Abstract.prototype.getColumnName.toString();
                            var columnNamesMemberName = source.match(
                                /return this\.([A-Za-z_]+)\[[A-Z]\];/
                            )[1];

                            /**
                             * @param {String} id
                             * @param {String} name
                             * @returns {Number}
                             */
                            qx.ui.table.model.Abstract.prototype.addColumn = function(id, name) {
                                var columnIndex = this[columnIdsMemberName].push(id) - 1;
                                this[columnNamesMemberName].push(name);
                                this.fireEvent('metaDataChanged');

                                return columnIndex;
                            };
                        }

                        if (
                            typeof qx.ui.table.columnmodel.Basic.prototype.addColumn !== 'function'
                        ) {
                            source = qx.ui.table.columnmodel.Basic.prototype.getColumnWidth.toString();
                            var columnsMemberName = source.match(
                                /return this\.([A-Za-z_]+)\[[A-Z]\]\.width;/
                            )[1];
                            source = qx.ui.table.columnmodel.Basic.prototype.getOverallColumnCount.toString();
                            var columnOrderMemberName = source.match(
                                /return this\.([A-Za-z_]+)\.length;/
                            )[1];
                            source = qx.ui.table.columnmodel.Basic.prototype.getVisibleColumnAtX.toString();
                            var columnVisibilityMemberName = source.match(
                                /return this\.([A-Za-z_]+)\[[A-Z]\];/
                            )[1];
                            source = qx.ui.table.columnmodel.Basic.prototype._getColToXPosMap.toString();
                            var columnToXPosMapMemberName = source.match(
                                /return this\.([A-Za-z_]+);\}$/
                            )[1];

                            source = qx.ui.table.columnmodel.Basic.prototype.init.toString();
                            var matches = source.match(
                                /this\.([A-Za-z_]+)\|\|\(this\.\1=new qx\.ui\.table\.columnmodel\.Basic\.DEFAULT_HEADER_RENDERER\(\)\);.+this\.([A-Za-z_]+)\|\|\(this\.\2=new qx\.ui\.table\.columnmodel\.Basic\.DEFAULT_DATA_RENDERER\(\)\);.+this\.([A-Za-z_]+)\|\|\(this\.\3=new qx\.ui\.table\.columnmodel\.Basic\.DEFAULT_EDITOR_FACTORY\(\)\);/
                            );
                            var headerRendererMemberName = matches[1];
                            var dataRendererMemberName = matches[2];
                            var editorFactoryMemberName = matches[3];

                            /**
                             * @param {Boolean} visible
                             * @returns {Number}
                             */
                            qx.ui.table.columnmodel.Basic.prototype.addColumn = function(visible) {
                                var columnIndex =
                                    this[columnsMemberName].push({
                                        width: qx.ui.table.columnmodel.Basic.DEFAULT_WIDTH,
                                        headerRenderer: this[headerRendererMemberName],
                                        dataRenderer: this[dataRendererMemberName],
                                        editorFactory: this[editorFactoryMemberName],
                                    }) - 1;

                                this[columnToXPosMapMemberName] = null;
                                this[columnOrderMemberName].push(columnIndex);

                                if (!visible) {
                                    this[columnVisibilityMemberName].push(columnIndex);
                                }

                                this.setColumnVisible(columnIndex, visible);

                                return columnIndex;
                            };
                        }

                        if (
                            typeof webfrontend.gui.info.BaseInfoWindow.prototype.onCellClick !==
                            'function'
                        ) {
                            source = Function.prototype.toString.call(
                                webfrontend.gui.info.BaseInfoWindow.constructor
                            );
                            var createOutgoingTabMethodName = source.match(
                                /;[A-Za-z]+\.add\(this\.([A-Za-z_]+)\(\)\);this\.[A-Za-z_]+=new webfrontend\.gui\.widgets\.confirmationWidgets\.ProtectionConfirmationWidget\(\);/
                            )[1];
                            source = webfrontend.gui.info.BaseInfoWindow.prototype[
                                createOutgoingTabMethodName
                            ].toString();
                            var onCellClickMethodName = source.match(
                                /([A-Za-z]+)\.set\(\{statusBarVisible:false,columnVisibilityButtonVisible:false\}\);\1\.addListener\([A-Za-z]+,this\.([A-Za-z_]+),this\.[A-Za-z_]+\);/
                            )[2];
                            webfrontend.gui.info.BaseInfoWindow.prototype.onCellClick =
                                webfrontend.gui.info.BaseInfoWindow.prototype[
                                    onCellClickMethodName
                                ];
                        }

                        if (
                            typeof webfrontend.gui.info.BaseInfoWindow.prototype
                                .onTotalUnreadCountUpdated !== 'function'
                        ) {
                            source = webfrontend.gui.info.BaseInfoWindow.prototype._onClose.toString();
                            var onTotalUnreadCountUpdatedMethodName = source.match(
                                /ClientLib\.Data\.Reports\.TotalUnreadCountUpdated,this,this\.([A-Za-z_]+)\);/
                            )[1];
                            webfrontend.gui.info.BaseInfoWindow.prototype.onTotalUnreadCountUpdated =
                                webfrontend.gui.info.BaseInfoWindow.prototype[
                                    onTotalUnreadCountUpdatedMethodName
                                ];

                            var context = this;
                            webfrontend.gui.info.BaseInfoWindow.prototype[
                                onTotalUnreadCountUpdatedMethodName
                            ] = function() {
                                return context.onTotalUnreadCountUpdated(this, arguments);
                            };
                        }

                        /* Detect and fix bug described in http://forum.alliances.commandandconquer.com/showthread.php?tid=30346 */
                        {
                            source = ClientLib.Data.Reports.Reports.prototype.AddReport.toString();
                            var initMethodName = source.match(
                                /break;\}\}[a-z]\.([A-Z]{6})\([a-z]\);if/
                            )[1];

                            source = ClientLib.Data.Reports.CombatReport.prototype[
                                initMethodName
                            ].toString();
                            var setDataMethodName = source.match(
                                /this\.([A-Z]{6})\([A-Za-z]+\);/
                            )[1];

                            source = ClientLib.Data.Reports.CombatReport.prototype[
                                setDataMethodName
                            ].toString();
                            var matches = source.match(
                                /this\.([A-Z]{6})=([a-z])\.abl;this\.[A-Z]{6}=\2\.abl;/
                            );

                            if (matches !== null) {
                                var attackerBaseIdMemberName = matches[1];
                                var original =
                                    ClientLib.Data.Reports.CombatReport.prototype[
                                        setDataMethodName
                                    ];

                                ClientLib.Data.Reports.CombatReport.prototype[
                                    setDataMethodName
                                ] = function(data) {
                                    original.call(this, data);
                                    this[attackerBaseIdMemberName] = data.d.abi;
                                };
                            } else {
                                console.warn(
                                    'ReportStats::initializeHacks',
                                    'Unable to patch ClientLib.Data.Reports.CombatReport.prototype.' +
                                        setDataMethodName +
                                        '. Its likely already fixed in the game code.'
                                );
                            }
                        }

                        if (typeof qx.ui.table.Table.prototype.getLastFocusedRow !== 'function') {
                            qx.ui.table.Table.prototype.lastFocusedRow = null;
                            var originalSetFocusedCell = qx.ui.table.Table.prototype.setFocusedCell;

                            qx.ui.table.Table.prototype.setFocusedCell = function() {
                                this.lastFocusedRow = this.getFocusedRow();
                                originalSetFocusedCell.apply(this, arguments);
                            };

                            /**
                             * @returns {Number}
                             */
                            qx.ui.table.Table.prototype.getLastFocusedRow = function() {
                                return this.lastFocusedRow;
                            };
                        }
                    },

                    initializeUserInterface: function() {
                        var baseInfoWindow = webfrontend.gui.info.BaseInfoWindow.getInstance();
                        var tabs = baseInfoWindow.getChildren()[0].getChildren();

                        for (var tabIndex = 1; tabIndex <= 2; tabIndex++) {
                            var table = tabs[tabIndex].getChildren()[0];

                            var tableModel = table.getTableModel();
                            var tableModelIndex = tableModel.addColumn('ReportStatsCheckbox', '');
                            tableModel.setColumnSortable(tableModelIndex, false);
                            tableModel.addListener(
                                'dataChanged',
                                this.onTableModelDataChange,
                                this
                            );
                            tableModel.setUserData('checkboxColumnIndex', tableModelIndex);

                            var columnModel = table.getTableColumnModel();
                            var columnModelIndex = columnModel.addColumn(true);
                            columnModel.setDataCellRenderer(
                                columnModelIndex,
                                new qx.ui.table.cellrenderer.Boolean()
                            );
                            columnModel.setColumnWidth(
                                columnModelIndex,
                                ReportStats.CheckboxColumnWidth
                            );
                            columnModel.moveColumn(columnModelIndex, 0);

                            var cellClickEventName =
                                PerforceChangelist >= 434241 ? 'cellTap' : 'cellClick';
                            table.removeListener(
                                cellClickEventName,
                                baseInfoWindow.onCellClick,
                                tableModel
                            );
                            table.addListener(cellClickEventName, this.onCellClickDelegate, this);
                            table.getChildControl('statusbar').set({
                                height: ReportStats.StatusbarHeight,
                                rich: true,
                                toolTip: new qx.ui.tooltip.ToolTip().set({
                                    label:
                                        '<div>"Loot" is the sum of resources gained from destruction, plunder and own repair costs.</div><br/>' +
                                        '<div>Tip: You can select multiple reports at once by holding down the Shift key.</div>',
                                    rich: true,
                                }),
                            });
                        }

                        baseInfoWindow.setWidth(
                            baseInfoWindow.getWidth() +
                                ReportStats.CheckboxColumnWidth +
                                ReportStats.BaseInfoExtraWidth
                        );
                        baseInfoWindow.setHeight(
                            baseInfoWindow.getHeight() + ReportStats.StatusbarHeight
                        );
                    },

                    /**
                     * Sets checkbox value to false for rows being initialized
                     * @param {qx.event.type.Data} event
                     */
                    onTableModelDataChange: function(event) {
                        var data = event.getData();

                        if (data.firstColumn !== 0) {
                            return;
                        }

                        var tableModel = event.getTarget();
                        var columnIndex = tableModel.getUserData('checkboxColumnIndex');
                        var columnId = tableModel.getColumnId(columnIndex);

                        for (var row = data.firstRow; row <= data.lastRow; row++) {
                            var rowData = tableModel.getRowData(row);

                            if (rowData && rowData[columnId] === undefined) {
                                rowData[columnId] = false;
                            }
                        }

                        tableModel.fireDataEvent('dataChanged', {
                            firstRow: data.firstRow,
                            lastRow: data.lastRow,
                            firstColumn: columnIndex,
                            lastColumn: columnIndex,
                        });

                        if (this.isReportTab(this.getCurrentBaseInfoTab())) {
                            this.calculateCombinedRepairCosts(tableModel);
                        }
                    },

                    /**
                     * @param {qx.ui.table.pane.CellEvent} event
                     */
                    onCellClickDelegate: function(event) {
                        var tableModel = event
                            .getTarget()
                            .getTable()
                            .getTableModel();

                        if (
                            event.getColumn() === tableModel.getUserData('checkboxColumnIndex') &&
                            tableModel.getRowData(event.getRow())
                        ) {
                            this.onCheckboxClick(event);
                        } else {
                            webfrontend.gui.info.BaseInfoWindow.prototype.onCellClick.call(
                                tableModel,
                                event
                            );
                        }
                    },

                    /**
                     * @param {qx.ui.table.pane.CellEvent} event
                     */
                    onCheckboxClick: function(event) {
                        var table = event.getTarget().getTable();
                        var tableModel = table.getTableModel();
                        var newValue = !tableModel.getValue(event.getColumn(), event.getRow());

                        if (event.isShiftPressed() && table.getLastFocusedRow() !== null) {
                            var start = Math.min(event.getRow(), table.getLastFocusedRow());
                            var end = Math.max(event.getRow(), table.getLastFocusedRow());

                            for (var row = start; row <= end; row++) {
                                tableModel.setValue(event.getColumn(), row, newValue);
                            }
                        } else {
                            tableModel.setValue(event.getColumn(), event.getRow(), newValue);
                        }

                        this.calculateCombinedRepairCosts(tableModel);
                    },

                    /**
                     * @description Start the process, get all Id's and load if not already send
                     * @param {webfrontend.data.ReportHeaderDataModel} tableModel
                     */
                    calculateCombinedRepairCosts: function(tableModel) {
                        var wasLoading = this.reportsLoading.length > 0;
                        this.reportsLoading = [];
                        this.reportsLoaded = [];

                        var rowCount = tableModel.getRowCount(); // 4

                        // collect row data ids
                        for (var row = 0; row < rowCount; row++) {
                            var rowData = tableModel.getRowData(row);
                            // todo check if id is allready send to server

                            if (rowData) {
                                this.reportsLoading.push(rowData.Id); // add report id
                            }
                        }

                        // start the loading
                        if (this.reportsLoading.length > 0) {
                            var reports = ClientLib.Data.MainData.GetInstance().get_Reports();

                            if (!wasLoading) {
                                phe.cnc.Util.attachNetEvent(
                                    reports,
                                    'ReportDelivered',
                                    ClientLib.Data.Reports.ReportDelivered,
                                    this,
                                    this.onReportDelivered
                                );
                            }

                            phe.cnc.Util.attachNetEvent(
                                reports,
                                'ReportsDelivered',
                                ClientLib.Data.Reports.ReportsDelivered,
                                this,
                                () => console.error('HIER LÄUFTS JA GUT')
                            );

                            for (var i = this.reportsLoading.length - 1; i >= 0; i--) {
                                reports.RequestReportData(this.reportsLoading[i]);
                            }

                            /*if (this.reportsLoading.length > 0) {
                                var table = this.getCurrentBaseInfoTab().getChildren()[0];
                                table.getChildControl('statusbar').setValue('Please wait...');
                            }*/
                        } else {
                            this.onAllReportsLoaded();
                        }
                    },

                    /**
                     * @param {webfrontend.gui.info.BaseInfoWindow} baseInfoWindow
                     * @param {Object} parameters
                     */
                    onTotalUnreadCountUpdated: function(baseInfoWindow, parameters) {
                        if (!this.skipBaseInfoReportsReload) {
                            baseInfoWindow.onTotalUnreadCountUpdated.apply(
                                baseInfoWindow,
                                parameters
                            );
                        } else {
                            this.skipBaseInfoReportsReload--;
                        }
                    },

                    /**
                     * @description handler after a report was loaded, removes the id from loading and push the report
                     *     to the loaded
                     * @param {ClientLib.Data.Reports.CombatReport} report
                     */
                    onReportDelivered: function(report) {
                        var index = this.reportsLoading.indexOf(report.get_Id());

                        if (index !== -1) {
                            this.reportsLoading.splice(index, 1);
                            this.reportsLoaded.push(report);

                            // last report was loaded
                            if (!this.reportsLoading.length) {
                                this.onAllReportsLoaded();
                            }
                        }

                        if (!report.get_IsRead()) {
                            report.set_IsRead(true);
                            this.skipBaseInfoReportsReload++;
                        }
                    },

                    /**
                     * @description build and send reports
                     * @param {ClientLib.Data.Reports.CombatReport} report
                     */
                    onAllReportsLoaded: async function() {
                        // remove listener
                        phe.cnc.Util.detachNetEvent(
                            ClientLib.Data.MainData.GetInstance().get_Reports(),
                            'ReportDelivered',
                            ClientLib.Data.Reports.ReportDelivered,
                            this,
                            this.onReportDelivered
                        );

                        console.log('Find reports')
                        // request data on the own
                        // const resp = await  ClientLib.Data.Reports.Reports.prototype.RequestReportHeaderDataAll()
                        // console.log({resp})

                        var hasSelectedReports = this.reportsLoaded.length > 0;
                        // var table = this.getCurrentBaseInfoTab().getChildren()[0];
                        // table.setStatusBarVisible(hasSelectedReports);

                        if (!hasSelectedReports) return;
                        // var attackerBaseIds = [];
                        // var defenderBaseIds = [];
                        var repairTimeCosts = 0;
                        var minCommandPointCosts = 0;
                        var maxCommandPointCosts = 0;
                        // var firstAttack = null;
                        // var lastAttack = 0;

                        var loot = {};
                        var getTotalLootMethod, getRepairCostsMethod;

                        var reports = [];

                        // off
                        const { CombatReport } = ClientLib.Data.Reports;
                        if (
                            this.reportsLoaded[0].get_PlayerReportType() ===
                            ClientLib.Data.Reports.EPlayerReportType.CombatOffense
                        ) {
                            getTotalLootMethod =
                                CombatReport.prototype.GetAttackerTotalResourceReceived;
                            getRepairCostsMethod = CombatReport.prototype.GetAttackerRepairCosts;
                        }
                        // def
                        else {
                            getTotalLootMethod =
                                CombatReport.prototype.GetDefenderTotalResourceCosts;
                            getRepairCostsMethod = CombatReport.prototype.GetDefenderRepairCosts;
                        }

                        // init sever configs for cp costs
                        var server = ClientLib.Data.MainData.GetInstance().get_Server();
                        var player = ClientLib.Data.MainData.GetInstance().get_Player();
                        var combatCostMinimum = server.get_CombatCostMinimum();
                        var combatCostMinimumPvP = server.get_UsesRebalancingI()
                            ? server.get_PvPCombatCostMinimum()
                            : combatCostMinimum;
                        var combatCostPerFieldInside = server.get_CombatCostPerField();
                        var combatCostPerFieldOutside = server.get_CombatCostPerFieldOutsideTerritory();

                        // loop through all reports
                        for (var i = 0; i < this.reportsLoaded.length; i++) {
                            var report = this.reportsLoaded[i];
                            console.log({ report });

                            var rapport = {};
                            rapport.id = report.get_Id();

                            if (!(report instanceof CombatReport)) {
                                continue;
                            }

                            rapport.attackerBaseId = report.get_AttackerBaseId();
                            rapport.defenderBaseId = report.get_DefenderBaseId();

                            // if (attackerBaseIds.indexOf(report.get_AttackerBaseId()) === -1) {
                            //     attackerBaseIds.push(report.get_AttackerBaseId());
                            // }
                            //
                            // if (defenderBaseIds.indexOf(report.get_DefenderBaseId()) === -1) {
                            //     defenderBaseIds.push(report.get_DefenderBaseId());
                            // }

                            // add repair time
                            repairTimeCosts += report.GetAttackerMaxRepairTime();
                            rapport.maxRep = report.GetAttackerMaxRepairTime();
                            rapport.infRep = report.GetAttackerInfantryRepairCosts();
                            rapport.vehRep = report.GetAttackerVehicleRepairCosts();
                            rapport.airRep = report.GetAttackerAirRepairCosts();

                            var distance = Math.sqrt(
                                Math.pow(
                                    report.get_AttackerBaseXCoord() -
                                        report.get_DefenderBaseXCoord(),
                                    2
                                ) +
                                    Math.pow(
                                        report.get_AttackerBaseYCoord() -
                                            report.get_DefenderBaseYCoord(),
                                        2
                                    )
                            );

                            rapport.distance = distance; // total distane between coords

                            switch (report.get_Type()) {
                                case ClientLib.Data.Reports.EReportType.Combat: // 1, pvp
                                    var isFriendlyTerritory =
                                        report.get_AttackerAllianceName() ===
                                        report.get_DefenderAllianceName();
                                    var cost = Math.floor(
                                        combatCostMinimumPvP +
                                            (isFriendlyTerritory
                                                ? combatCostPerFieldInside
                                                : combatCostPerFieldOutside) *
                                                distance
                                    );
                                    // minCommandPointCosts += cost;
                                    // maxCommandPointCosts += cost;
                                    rapport.def = true;
                                    rapport.minCp = cost;
                                    rapport.maxCp = cost;
                                    break;
                                case ClientLib.Data.Reports.EReportType.NPCRaid: // 2, pvp
                                    switch (parseInt(report.get_DefenderBaseName(), 10)) {
                                        case ClientLib.Data.Reports.ENPCCampType.Base: // 4
                                        case ClientLib.Data.Reports.ENPCCampType.Fortress: // 6
                                            var cost = Math.floor(
                                                combatCostMinimum +
                                                    combatCostPerFieldOutside * distance
                                            );
                                            // minCommandPointCosts += cost;
                                            // maxCommandPointCosts += cost;
                                            rapport.off = true;
                                            rapport.minCp = cost;
                                            rapport.maxCp = cost;
                                            break;
                                        default:
                                            const minCp = Math.floor(
                                                combatCostMinimum +
                                                    combatCostPerFieldInside * distance
                                            );
                                            const maxCp = Math.floor(
                                                combatCostMinimum +
                                                    combatCostPerFieldOutside * distance
                                            );
                                            // minCommandPointCosts += minCp;
                                            // maxCommandPointCosts += maxCp;
                                            rapport.off = true;
                                            rapport.minCp = minCp;
                                            rapport.maxCp = maxCp;
                                    }
                                    break;
                                case ClientLib.Data.Reports.EReportType.NPCPlayerCombat: // 5
                                    // No repair time or command point cost for Forgotten attacks
                                    break;
                                default:
                                    throw 'Unexpected report type (' + report.get_Type() + ')';
                            }

                            rapport.time = report.get_Time();
                            // if (firstAttack === null || reportTime < firstAttack) {
                            //     firstAttack = reportTime;
                            // }
                            //
                            // if (reportTime > lastAttack) {
                            //     lastAttack = reportTime;
                            // }

                            /**
                                    @discroption: calc the loot with out the rep res costs
                                 */
                            for (var resourceType in ReportStats.ResourceTypes) {
                                var resourceCount =
                                    getTotalLootMethod.call(report, resourceType) -
                                    getRepairCostsMethod.call(report, resourceType);

                                if (resourceCount !== 0) {
                                    if (!(resourceType in loot)) {
                                        loot[resourceType] = 0;
                                    }

                                    loot[resourceType] += resourceCount;
                                }
                            }
                            rapport.loot = loot;

                            reports.push(rapport);
                        }

                        // var lootRow = 'Loot:';
                        // var sumRes = 0;
                        // for (var resourceType in loot) {
                        //     lootRow += ' <img width="17" height="17" src="' + ReportStats.ResourceTypes[resourceType] + '" style="vertical-align: text-bottom;"/>';
                        //
                        //     if (loot[resourceType] < 0) {
                        //         lootRow += '<span style="color: #d00;">' + phe.cnc.gui.util.Numbers.formatNumbersCompact(loot[resourceType]) + '</span>';
                        //     }
                        //     else {
                        //         lootRow += phe.cnc.gui.util.Numbers.formatNumbersCompact(loot[resourceType]);
                        //         sumRes += loot[resourceType];
                        //     }
                        // }
                        // lootRow += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sum: ' + phe.cnc.gui.util.Numbers.formatNumbersCompact(sumRes);
                        // lootRow += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sum/CP (max): ' + phe.cnc.gui.util.Numbers.formatNumbersCompact(sumRes / minCommandPointCosts);
                        // lootRow += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sum/CP (min): ' + phe.cnc.gui.util.Numbers.formatNumbersCompact(sumRes / maxCommandPointCosts);

                        console.log({
                            server,
                            player,
                            combatCostMinimum,
                            combatCostMinimumPvP,
                            combatCostPerFieldInside,
                            combatCostPerFieldOutside,

                            minCommandPointCosts,
                            maxCommandPointCosts,
                            // firstAttack,
                            // lastAttack,
                            getTotalLootMethod,
                            getRepairCostsMethod,

                            // attackerBaseIds, // id off attacker bases, the player pvp attacker maybe
                            // defenderBaseIds,    // id of defender bases, the bases who got attacked, maybe the player also in pvp

                            repairTimeCosts, // total time in s
                            loot, //
                        });

                        console.warn('All reports');
                        console.log({ reports });

                        // fetch('https://cnc-eco.herokuapp.com/api/v1/reports/update', {
                        fetch('http://localhost:8000/api/v1/reports/update', {
                            method: 'POST',
                            headers: {
                                "content-type": "application/json",
                            },
                            body: JSON.stringify({
                                reports,
                                world: server.get_WorldId(),
                                player: player.get_Name(),
                                playerId: player.get_Id(),
                                accountId: player.get_AccountId(),
                            })
                        }).then(r => r.json()).catch(e => console.warn(e))

                        /*table.getChildControl('statusbar').setValue(
                                attackerBaseIds.length + ' attacker' + (attackerBaseIds.length === 1 ? '' : 's') + ', ' +
                                defenderBaseIds.length + ' defender' + (defenderBaseIds.length === 1 ? '' : 's') + ', ' +
                                this.reportsLoaded.length + ' attack' + (this.reportsLoaded.length === 1 ? '' : 's') + ', ' +
                                phe.cnc.Util.getTimespanString(repairTimeCosts) + ' RT and ' + (minCommandPointCosts === maxCommandPointCosts
                                    ? minCommandPointCosts
                                    : (minCommandPointCosts + '-' + maxCommandPointCosts)
                                ) + ' CPs spent' + (this.reportsLoaded.length > 1
                                    ? ' in ' + phe.cnc.Util.getTimespanString((lastAttack - firstAttack) / 1000)
                                    : ''
                                ) + '<br/>' + lootRow
                            );*/
                    },

                    /**
                     * @returns {qx.ui.tabview.Page}
                     */
                    getCurrentBaseInfoTab: function() {
                        return webfrontend.gui.info.BaseInfoWindow.getInstance()
                            .getChildren()[0]
                            .getSelection()[0];
                    },

                    /**
                     * @param {qx.ui.tabview.Page} tab
                     * @returns {Boolean}
                     */
                    isReportTab: function(tab) {
                        var tabView = webfrontend.gui.info.BaseInfoWindow.getInstance().getChildren()[0];
                        var tabIndex = tabView.getChildren().indexOf(tab);

                        return 1 <= tabIndex && tabIndex <= 2;
                    },
                },
            });
        }

        function waitForGame() {
            try {
                if (
                    typeof qx !== 'undefined' &&
                    qx.core.Init.getApplication() &&
                    qx.core.Init.getApplication().initDone
                ) {
                    createReportStats();
                    ReportStats.getInstance().initialize();
                } else {
                    setTimeout(waitForGame, 1000);
                }
            } catch (e) {
                console.log('ReportStats: ', e.toString());
            }
        }

        setTimeout(waitForGame, 1000);
    };

    var script = document.createElement('script');
    script.innerHTML = '(' + main.toString() + ')();';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
})();
