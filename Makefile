DOCKER_IMAGE_TAG=1.7.4
# Docker image URL on Gitlab
DOCKER_IMAGE_NAME=registry.numberly.in/team-dmp/front-end/trees:$(DOCKER_IMAGE_TAG)
PORT=8080

docker-build-dev: ## Build docker image dev
	docker build --build-arg MODE=dev -t $(DOCKER_IMAGE_NAME) .

docker-build-prod: ## Build docker image prod
	docker build --build-arg MODE=prod -t $(DOCKER_IMAGE_NAME) .

docker-run: ## Run docker image locally with dev config
	docker run -d -p $(PORT):$(PORT) $(DOCKER_IMAGE_NAME)

docker-push: ## Push the docker image to the registry
	docker push $(DOCKER_IMAGE_NAME)

kube-deploy-dev: ## Deploy on k8s with dev conf
	kubectl apply -f kubernetes.dev.yaml

kube-deploy-prod: ## Deploy on k8s with production conf
	kubectl apply -f kubernetes.prod.yaml

help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort
