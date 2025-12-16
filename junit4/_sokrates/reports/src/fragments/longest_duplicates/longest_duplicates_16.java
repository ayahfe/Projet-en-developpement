src/main/java/org/junit/internal/runners/TestClass.java [88:94]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        List<Class<?>> results = new ArrayList<Class<?>>();
        Class<?> current = testClass;
        while (current != null) {
            results.add(current);
            current = current.getSuperclass();
        }
        return results;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



src/main/java/org/junit/runners/model/TestClass.java [172:178]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        List<Class<?>> results = new ArrayList<Class<?>>();
        Class<?> current = testClass;
        while (current != null) {
            results.add(current);
            current = current.getSuperclass();
        }
        return results;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



