import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Either, left, right } from '@/core/either'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type UseCaseResponse = Either<ResourceNotFoundError, { question: Question }>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<UseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
