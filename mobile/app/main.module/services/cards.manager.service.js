'use strict';

/**
 * Основной задачей данного сервиса явялется реализация загрузки и выдачи карточек
 * заданного типа.
 * Тип карт в сервисе не различается. Самое главное, чтобы пользователь предоставил
 * корректный метод загрузки интересующих его карточек.
 * Сервис реализует выгрузку карточек по требованию с последующим сохранением результата такой выгрузки
 * для моментальной выдачи в следующий раз. То есть, например, когда пользователь запрашивает карточки в
 * самый первый раз, его ожидает уже ВЫГРУЖЕННЫЙ раннее пак карт. После такого запроса, сервис осуществит выгрузку
 * следующей порции (пак) карточек и возвратит ее по требованию без ожидания. По крайней мере,
 * он будет пытаться сделать это.
 * Безусловно, возможны исключительные ситуации, когда до следующей выдачи пользователю так и не удалось выгрузить
 * новую порцию карточек. В таком случае, пользователь будет восприниматься как подписчик на событие выгрузки
 * карточек.
 * Каждая просьба получения карточек выполняется передачей управления указанному (в качестве параметра
 * при получении) коллбэку.
 *
 * Created by iretd on 11.10.16.
 */

CardsManager.$inject = ['kudagoEvents'];

module.exports = CardsManager;

function CardsManager(kudagoEvents) {

    var unloadingCardsInfo = {};
    var packsOfCards = {};

    var cardSwipedCounter = {};

    var pushMethod;

    // Подписчики на получение нового пака карточек указанного типа.
    var subscribersForCardsPack = {};

    var t = {};

    t.addUnloadingCardsInfo = addUnloadingCardsInfo;
    t.getNextCardsPack = getNextCardsPack;
    t.registerPushCardsMethod = registerPushCardsMethod;
    t.start = start;
    t.cardSwiped = cardSwiped;

    return t;

    /**
     * Регистрация метода пуша карточек.
     * Именно в данный метод будут передаваться новые карточки в момент такой
     * необходимости (по решению менеджера).
     * @param callback сам пуш метод.
     */
    function registerPushCardsMethod(callback) {

        pushMethod = callback;

    }

    /**
     * Метод старта работы менеджера.
     * Начинает работу выдачи паков карточек в push метод (pushMethod).
     */
    function start() {

        if (pushMethod) {

            intializeTypeCardsForManager();

            getNextCardsPack(kudagoEvents.cardsType, pushMethod);


        } else {

            // На случай, если забыли зарегистрировать pushMethod.
            console.log('There is no push method! Initialize this one first.')

        }

    }


    /**
     * Метод, который позволяет зарегистрировать тип карточек (индивидуальное значение
     * на уровне сервиса) и метод их загрузки.
     * @param type тип карточек (например: vk; kudago.events и т.д.).
     * @param functionForRequiringNewCards метод, вызов которого будет осуществляться
     *                                     для выгрузки карточек указанного в type типа.
     *                                     Предполагается, что functionForRequiringNewCards
     *                                     принимает в качестве параметра коллбэк, как обработчик
     *                                     результата своего выполнения.
     */
    function addUnloadingCardsInfo(type, functionForRequiringNewCards) {

        unloadingCardsInfo[type] = functionForRequiringNewCards;

    }

    /**
     * Метод запроса нового набора карточек указанного типа.
     * Данный метод, после возрата пака карточек, очищает его, так как по логике
     * работы сервиса, он пойдет за новым набором, который должен встать на его место.
     * Если в данный момент, какой-либо пак для указанного типа карточек отсуствует,
     * то считается, что необходимо начать его выгрузку, а пользователя, запросившего карточки,
     * занести в подписчики, для оповещения его по окончанию загрузки набора карт.
     * @param type интересующий тип карточек.
     * @param callback метод, который будет вызван по мере готовности
     *                 нового пака карточек.
     */
    function getNextCardsPack(type, callback) {

        unloadingNecessaryPackCards(type);

        // Если текущий пак событий определен - передаем его сразу как результат
        // и очищаем. Это будет служить флагом того, что этот пак был выдан.
        if (packsOfCards[type]) {

            callback(null, packsOfCards[type]);

            packsOfCards[type] = null;

        } else {

            // В противном случае, запоминаем того, кто запрашивал события.
            // Он их сразу получит после их выгрузки.
            addSubscriber(type, callback);

        }

    }

    function addSubscriber(type, subscriber) {

        subscribersForCardsPack[type] = subscribersForCardsPack[type] || [];

        subscribersForCardsPack[type].push(subscriber);

    }

    /**
     * Метод обновления текущего пака карточек.
     * Он привязывает пак карточек к указанному типу, который будет
     * выдан пользователю при первом же его запросе.
     * @param error ошибка, если она произошла.
     * @param type тип карточек, к которому привязывается пак.
     * @param results сам пак карточек.
     */
    function updatePackCards(error, type, results) {

        if (!error) {

            // Устанавливаем значение счетчика до момента выгрузки нового пака карточек.
            // TODO
            // Мб в отдельный метод.
            cardSwipedCounter[type] = Math.round(results.length / 2);

            // Если определены и имеются подписчики на тип карточек.
            if (subscribersForCardsPack[type] && subscribersForCardsPack[type].length) {

                // Оповещаем всех подписчиков о карточках.
                subscribersForCardsPack[type].forEach(function (subscriber) {

                    subscriber(null, results);

                });

                // Сбрасываем очередь подписчиков.
                subscribersForCardsPack[type] = [];

            } else {

                // Подписчиков нет - запоминаем полученный пак карточек,
                // для выдачи их в последующем запросе.
                // Запоминаем по одному паку. В массиве нет необходимости.
                packsOfCards[type] = results;

            }

        }

    }

    /**
     * Инициализируем сервисы получения карточек.
     */
    function intializeTypeCardsForManager() {

        addUnloadingCardsInfo(kudagoEvents.cardsType, kudagoEvents.requirePackEvents);

    }

    /**
     * Метод учитывает перелистывание карточек пользователем.
     * Учет перелистывания осуществляется для выяснения момента запуливания
     * нового пака карточек определенного типа в wirpl.contorller.
     * @param type тип карточки, которая была перелистнута.
     */
    function cardSwiped(type) {

        cardSwipedCounter[type]--;

        // Если мы достигли нуля в счетчике перелистывания, осуществляем
        // выгрузку нового пака.
        if (!cardSwipedCounter[type]) {

            getNextCardsPack(type, pushMethod);

        }

    }

    /**
     * Требуем выгрузку следующего пака событий.
     * @param type тип карт, которые нужно выгружать.
     */
    function unloadingNecessaryPackCards(type) {

        // Требуем выгрузку следующего пака событий.
        var unloadingCards = unloadingCardsInfo[type];

        unloadingCards(updatePackCards);

    }

}
