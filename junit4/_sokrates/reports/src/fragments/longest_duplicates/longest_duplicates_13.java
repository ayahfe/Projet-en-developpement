src/main/java/junit/framework/ComparisonFailure.java [9:23]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    private static final int MAX_CONTEXT_LENGTH = 20;
    private static final long serialVersionUID = 1L;

    private String fExpected;
    private String fActual;

    /**
     * Constructs a comparison failure.
     *
     * @param message the identifying message or null
     * @param expected the expected string value
     * @param actual the actual string value
     */
    public ComparisonFailure(String message, String expected, String actual) {
        super(message);
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



src/main/java/org/junit/ComparisonFailure.java [18:37]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    private static final int MAX_CONTEXT_LENGTH = 20;
    private static final long serialVersionUID = 1L;

    /*
     * We have to use the f prefix until the next major release to ensure
     * serialization compatibility. 
     * See https://github.com/junit-team/junit4/issues/976
     */
    private String fExpected;
    private String fActual;

    /**
     * Constructs a comparison failure.
     *
     * @param message the identifying message or null
     * @param expected the expected string value
     * @param actual the actual string value
     */
    public ComparisonFailure(String message, String expected, String actual) {
        super(message);
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



