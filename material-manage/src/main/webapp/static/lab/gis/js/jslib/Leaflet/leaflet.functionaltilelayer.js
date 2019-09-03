L.TileLayer.Functional = L.TileLayer.extend({

  _tileFunction: null,

  initialize: function (tileFunction, options) {
    this._tileFunction = tileFunction;
    L.Util.setOptions(this, options);
  },

  getTileUrl: function (tilePoint) {
    // Note: bbox code untested; pulled from TileLayer.WMS
    var map = this._map,
        crs = map.options.crs,
        tileSize = this.options.tileSize,
        zoom = this._map.getZoom(),
        nwPoint = tilePoint.multiplyBy(tileSize),
        sePoint = nwPoint.add(new L.Point(tileSize, tileSize)),
        nw = crs.project(map.unproject(nwPoint, zoom)),
        se = crs.project(map.unproject(sePoint, zoom)),
        bbox = [nw.x, se.y, se.x, nw.y].join(','),
        view = {
          bbox: bbox,
          width: tileSize,
          height: tileSize,
          zoom: zoom,
          tile: {
            row: tilePoint.y,
            column: tilePoint.x
          },
          subdomain: this._getSubdomain(tilePoint)
        };

    return this._tileFunction(view);
  },

  _loadTile: function (tile, tilePoint) {
    var tileUrl = this.getTileUrl(tilePoint);

    tile._layer = this;
    tile.onload = this._tileOnLoad;
    tile.onerror = this._tileOnError;

    if (typeof tileUrl === "string") {
      tile.src = tileUrl;
    } else if (tileUrl) {
      // assume jQuery.Deferred
      tileUrl.done(function (tileUrl) {
        tile.src = tileUrl;
      });
    }
  }
});

L.tileLayer.functional = function (tileFunction, options) {
  return new L.TileLayer.Functional(tileFunction, options);
};