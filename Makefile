clean:
	@rm -rf docs/build/html

install:
	@npm install

doc:
	@cd docs; ebookc compile
