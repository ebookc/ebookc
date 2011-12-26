clean:
	@rm -rf docs/build/html

install:
	@npm install

doc:
	@cd docs; rm -rf build/html; ebookc compile
