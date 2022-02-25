export default {
    methods: {
        locale(value) {
            if (value instanceof Object) {
                const selectedLocale = 'nl';

                return value[selectedLocale];
            }

            return value;
        }
    }
}
