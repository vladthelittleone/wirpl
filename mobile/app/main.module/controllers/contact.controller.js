'use strict';

Contact.$inject = ['$scope', 'connection'];

module.exports = Contact;

/**
 * Created by vaimer on 07.10.16.
 */

function Contact($scope, connection) {

  $scope.people = [
    { image:  'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_n.jpg',
      name:   'Вера Секси'
    },
    { image:  'http://c1.staticflickr.com/1/421/19046467146_548ed09e19_n.jpg',
      name:   'Олег Душка'
    },
    { image:  'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
      name:   'Жека 43 года'
    },{ image:  'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
      name:   'Жека 43 года'
    },{ image:  'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
      name:   'Жека 43 года'
    },{ image:  'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
      name:   'Жека 43 года'
    },{ image:  'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg',
      name:   'Жека 43 года'
    }
  ];

}
