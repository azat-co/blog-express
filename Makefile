REPORTER = list
MOCHA_OPTS = --ui bdd -c

test:
	clear
	echo Seeding blog-test *****************************************************
	./db/seed-test.sh
	echo Starting test *********************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/*.js
	echo Ending test

.PHONY: test