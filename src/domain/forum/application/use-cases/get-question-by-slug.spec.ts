import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('[GetQuestionBySlugUseCase]', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: GetQuestionBySlugUseCase

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.isRight()).toBe(true)
    expect(newQuestion.title).toEqual(result.value?.question.title)
    expect(result.value?.question.slug.value).toEqual('example-question')
  })

  it('should be error ResourceNotFound', async () => {
    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
