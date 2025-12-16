src/main/java/junit/framework/ComparisonFailure.java [34:54]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    @Override
    public String getMessage() {
        return new ComparisonCompactor(MAX_CONTEXT_LENGTH, fExpected, fActual).compact(super.getMessage());
    }

    /**
     * Gets the actual string value
     *
     * @return the actual string value
     */
    public String getActual() {
        return fActual;
    }

    /**
     * Gets the expected string value
     *
     * @return the expected string value
     */
    public String getExpected() {
        return fExpected;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



src/main/java/org/junit/ComparisonFailure.java [47:67]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    @Override
    public String getMessage() {
        return new ComparisonCompactor(MAX_CONTEXT_LENGTH, fExpected, fActual).compact(super.getMessage());
    }

    /**
     * Returns the actual string value
     *
     * @return the actual string value
     */
    public String getActual() {
        return fActual;
    }

    /**
     * Returns the expected string value
     *
     * @return the expected string value
     */
    public String getExpected() {
        return fExpected;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



