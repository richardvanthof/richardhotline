install:
	@echo What do you want to install? Run \`make install-[env]\`, where [env] i client, printer, or dev.

install-client:
	cd client && npm install

install-printer:
	cd printer && pip install -r requirements.txt

install-dev:
	make install-client && make install-printer

run-printer:
	cd printer && \
	export LC_ALL=en_US.UTF-8 && \
	export LANG=en_US.UTF-8 && \
	sudo python3 -m flask run --host=0.0.0.0

run-client:
	cd client && npm run start

build-client:
	cd client && npm run build
