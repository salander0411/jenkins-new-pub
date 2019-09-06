node('jenkins-slave-k8s') {
    stage('Clone') {
        echo "1.Clone Stage"
        git credentialsId: 'c8d7ea58-aa4b-425b-b74e-51a066ab560b', url: 'https://github.com/jansony1/jenkins-new.git'
        script {
            build_tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
            repo_name = '182335798701.dkr.ecr.cn-northwest-1.amazonaws.com.cn'
            app_name = 'jenkins-demo'
        }
    }
    stage('Test') {
      echo "2.Test Stage"
    }
    stage('Build') {
        echo "3.Build Docker Image Stage"
        sh "docker build -t ${repo_name}/${app_name}:${build_tag} ."
    }
    stage('Push') {
        echo "4.Push Docker Image Stage"
        withDockerRegistry(credentialsId:'ecr:cn-northwest-1:93afbbbf-4961-4206-8b7c-82db9dd4a55a', url: 'https://182335798701.dkr.ecr.cn-northwest-1.amazonaws.com.cn') {
           sh "docker push ${repo_name}/${app_name}:${build_tag}"
        }
    }
    stage('Deploy') {
        echo "5. Deploy Stage"
        def userInput = input(
            id: 'userInput',
            message: 'Choose a deploy environment',
            parameters: [
                [
                    $class: 'ChoiceParameterDefinition',
                    choices: "Dev\nQA",
                    name: 'Env'
                ]
            ]
        )
        echo "This is a deploy step to ${userInput}"
        sh "sed -i 's/<REPO_NAME>/${repo_name}/' echo-server.yaml"
        sh "sed -i 's/<APP_NAME>/${app_name}/' echo-server.yaml"
        sh "sed -i 's/<BUILD_TAG>/${build_tag}/' echo-server.yaml"
        if (userInput == "Dev") {
            // deploy dev stuff
        } else if (userInput == "QA"){
            // deploy qa stuff
        } else {
            // deploy prod stuff
        }
        sh "kubectl apply -f echo-server.yaml"
    }
}
