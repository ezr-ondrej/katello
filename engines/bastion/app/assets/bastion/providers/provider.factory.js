/**
 * Copyright 2013 Red Hat, Inc.
 *
 * This software is licensed to you under the GNU General Public
 * License as published by the Free Software Foundation; either version
 * 2 of the License (GPLv2) or (at your option) any later version.
 * There is NO WARRANTY for this software, express or implied,
 * including the implied warranties of MERCHANTABILITY,
 * NON-INFRINGEMENT, or FITNESS FOR A PARTICULAR PURPOSE. You should
 * have received a copy of GPLv2 along with this software; if not, see
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt.
 **/

/**
 * @ngdoc service
 * @name  Bastion.providers.factory:Provider
 *
 * @requires $resource
 * @requires CurrentOrganization
 *
 * @description
 *   Provides a $resource for product or list of providers.
 */
angular.module('Bastion.providers').factory('Provider',
    ['$resource', 'CurrentOrganization', function ($resource, CurrentOrganization) {

        return $resource('/katello/api/providers/:id/:action',
            {'id': '@id', 'organization_id': CurrentOrganization},
            {
                'query':  {'method': 'GET', params: {'provider_type': 'Custom'}},
                'update': {'method': 'PUT'},
                'deleteManifest': {'method': 'POST', 'params': {'action': 'delete_manifest'}},
                'refreshManifest': {'method': 'POST', 'params': {'action': 'refresh_manifest'}}
            }
        );
    }]
);
