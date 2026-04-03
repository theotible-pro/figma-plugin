figma.showUI(__html__, { width: 300, height: 200 });

figma.ui.onmessage = function (msg) {
  if (msg.type === "rename") {
    var selection = figma.currentPage.selection;
    var count = 0;

    for (var i = 0; i < selection.length; i++) {
      var node = selection[i];
      if (node.type !== "FRAME") continue;
      if (node.layoutMode === "NONE") continue;

      var gapValue = node.itemSpacing / 4;
      var gapRounded = Math.round(gapValue * 10) / 10;
      node.name = "gap-" + gapRounded;
      count++;
    }

    figma.ui.postMessage({ type: "done", count: count });
  }

  if (msg.type === "close") {
    figma.closePlugin();
  }
};