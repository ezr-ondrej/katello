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
 */

/**
 * @ngdoc object
 * @name  Bastion.systems.controller:SystemEventDetailsController
 *
 * @requires $scope
 * @requires SystemTask
 *
 * @description
 *   Provides the functionality for the details of a system event.
 */
angular.module('Bastion.systems').controller('TaskDetailsController',
    ['$scope', 'taskListProvider',
    function($scope, taskListProvider) {
        var taskId, fromState, fromParams;

        fromState = 'systems.details.tasks.index';
        fromParams = {};

        taskId = $scope.$stateParams.taskId;

        //Record our from state, so we can transition back there
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromStateIn, fromParamsIn) {
            if (!fromStateIn.abstract) {
                fromState = fromStateIn;
                fromParams = fromParamsIn;
            }
        });

        $scope.transitionBack = function() {
            $scope.transitionTo(fromState, fromParams);
        };

        $scope.updateTasks = function(tasks) {
            var task = tasks[0];
            $scope.task = task;
            if(!$scope.task.pending) {
                taskListProvider.unregisterScope($scope);
            }
        }

        taskListProvider.registerScope($scope, { 'type': 'task', 'task_id': taskId })
    }
]);
