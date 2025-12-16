src/main/java/org/junit/internal/runners/ClassRoadie.java [58:69]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            } catch (InvocationTargetException e) {
                throw e.getTargetException();
            }
        } catch (AssumptionViolatedException e) {
            throw new FailedBefore();
        } catch (Throwable e) {
            addFailure(e);
            throw new FailedBefore();
        }
    }

    private void runAfters() {
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



src/main/java/org/junit/internal/runners/MethodRoadie.java [135:146]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            } catch (InvocationTargetException e) {
                throw e.getTargetException();
            }
        } catch (AssumptionViolatedException e) {
            throw new FailedBefore();
        } catch (Throwable e) {
            addFailure(e);
            throw new FailedBefore();
        }
    }

    private void runAfters() {
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



