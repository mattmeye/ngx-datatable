"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function selectRow(selected, row, comparefn) {
    var selectedIndex = comparefn(row, selected);
    if (selectedIndex > -1) {
        selected.splice(selectedIndex, 1);
    }
    else {
        selected.push(row);
    }
    return selected;
}
exports.selectRow = selectRow;
function selectRows(selected, rows, comparefn) {
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var row = rows_1[_i];
        var selectedIndex = comparefn(row, selected);
        if (selectedIndex <= -1) {
            selected.push(row);
        }
    }
    return selected;
}
exports.selectRows = selectRows;
function deselectRows(selected, rows, comparefn) {
    for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
        var row = rows_2[_i];
        var selectedIndex = comparefn(row, selected);
        if (selectedIndex > -1) {
            selected.splice(selectedIndex, 1);
        }
    }
    return selected;
}
exports.deselectRows = deselectRows;
function selectRowsBetween(selected, rows, index, prevIndex, comparefn) {
    var reverse = index < prevIndex;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var greater = i >= prevIndex && i <= index;
        var lesser = i <= prevIndex && i >= index;
        var range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: prevIndex
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i <= range.end) {
                selected.push(row);
            }
        }
    }
    return selected;
}
exports.selectRowsBetween = selectRowsBetween;
//# sourceMappingURL=selection.js.map