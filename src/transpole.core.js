/**
 * Init wrapper for the core module.
 * @param {Object} The Object that the library gets attached to in library.init.js. If the library was not loaded with an AMD loader such as require.js, this is the global Object.
 */
function initTranspoleCore(context) {
    'use strict';

    var API_SUBSIDIARY_ID = '9d16ee6b-15a1-4963-bdeb-54d15dc27365';

    /**
     * @constructor
     * @param  {Object} opt_config [description]
     * @return {Transpole}         [description]
     */
    function Transpole(opt_config) {
        // enforces new
        if (!(this instanceof Transpole)) {
            return new Transpole(opt_config);
        }

        opt_config = opt_config || {};

        if (!opt_config.apiProxyUrl) {
            throw new Error('You have to provide a proxy URL.');
        }

        this.apiProxyBase = opt_config.apiProxyUrl;

        return this;
    }

    context.Transpole = Transpole;

    /**
     * Privates
     */

    /**
     *
     * @param  {String} endPoint [description]
     * @param  {Object} params   [description]
     * @return {Promise}         [description]
     */
    function transpoleRequest(endPoint, params) {
        var url = this.apiProxyBase + '/' + endPoint + '/' + API_SUBSIDIARY_ID;

        return Transpole.requestJSON(url, params);
    }

    /**
     * Publics
     */

    /**
     * Lines listing.
     * @return {Promise} [description]
     */
    Transpole.prototype.lines = function () {
        return transpoleRequest.call(this, 'lines').then(function (data) {
            return data.lines;
        });
    };

    /**
     * Stops listing.
     * @return {Promise} [description]
     */
    Transpole.prototype.stops = function () {
        return transpoleRequest.call(this, 'stops').then(function (data) {
            return data.stops;
        });
    };

    /**
     * Returns the three next schedules for the givent line name, stop name and direction.
     * @param  {String}   lineId    [description]
     * @param  {String}   stopId    [description]
     * @param  {String}   direction [description]
     * @return {Promise}            [description]
     */
    Transpole.prototype.next = function (lineId, stopId, direction) {
        var params = {
            lineId: lineId,
            stopId: stopId,
            wayId: direction
        };

        return transpoleRequest.call(this, 'nextSchedule', params);
    };
}