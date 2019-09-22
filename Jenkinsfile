node('jenkins-slave-k8s') {
    stage('Clone') {
        echo "1.Clone Stage"
        git credentialsId: 'e2d7a399-1254-49b0-81e3-07f8799b93ca', url: 'https://github.com/salander0411/jenkins-new-pub'
        script {
            build_tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
            repo_name = '287439122014.dkr.ecr.cn-north-1.amazonaws.com.cn'
            app_name = 'tiange'
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
        withDockerRegistry(credentialsId: 'ecr:cn-north-1:e1163822-037c-4cd0-a8fe-1906f36c4960', url: 'https://287439122014.dkr.ecr.cn-north-1.amazonaws.com.cn/tiange')  {
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
